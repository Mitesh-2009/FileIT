import React from 'react';
import { FlatList, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { backendInterface } from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import AsyncstorageUtil from '../../utils/asyncstorage.util';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import { BasePage } from '../common/base.page';
import { StandardButton } from '../common/components';
import { NotchPushComponent } from '../common/components/basic';
import { pageStyle } from './docs.page.style';

export default class DocsPage extends BasePage {
  constructor(props) {
    super(props, {
      documentHash: '',
      documents: [],
    }, true);
  }

  componentDidAppear = () => {
    super.componentDidAppear();
    console.log('Docs Call componentDidAppear');
    AsyncStorageUtil.getItem('DocsArray').then((value) => {
      let arrVal = JSON.parse(value);
      console.log('DocsArray Async:-', arrVal);
      if (!!arrVal) {
        this.setState({
          documents: arrVal,
        });
      }
    });
  };

  componentDidDisappear = () => {
    super.componentDidDisappear();
    console.log('Docs Call componentDidDisappear');
    AsyncstorageUtil.setItem('DocsArray', this.state.documents).catch(() => null);
  };

  pressUploadButton = async () => {
    console.log('Click Upload Button');
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      const dataFile = new FormData();
      dataFile.append('file', {
        uri: res.uri,
        type: res.type,
        name: !!res.name ? res.name : 'test',
      });
      console.log('File data:-', dataFile);
      if (!!res) {
        await backendInterface.uploadFile(dataFile)
          .then((response) => {
            console.log('GET CID:-', response.cid);
            let fileItem = {
              name: '',
              cid: '',
              localPath: '',
            };
            fileItem.name = !!res.name ? res.name : 'test';
            fileItem.cid = response.cid;
            fileItem.localPath = res.uri;
            console.log('fileItem:-', fileItem);
            this.setState({
              documents: [...this.state.documents, fileItem],
              documentHash: response.cid,
            }, () => {
              console.log('documents:-', this.state.documents);
              console.log('1 st File URL:-', `https://ipfs.jpgstoreapis.com/${this.state.documents[0].cid}`);
            });
          }).catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent/>
        <View style={{marginHorizontal: 4}}>
          <StandardButton
            labelText={'Upload Document'}
            onPress={() => {
              return this.pressUploadButton();
            }}
            width={'50%'}
            color={'#6DBF8B'}
            style={pageStyle.uploadDocumentButtonStyle}
          />
          {!!this.state.documentHash ?
            <Text style={pageStyle.hashTextStyle}>Content Identifier(CID):-{this.state.documentHash}</Text>
            : null}
          {this.state.documents.length > 0 ? (
            <FlatList
              numColumns={3}
              style={pageStyle.listStyle}
              scrollEnabled={true}
              data={this.state.documents}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={pageStyle.listItemButtonStyle}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log('Click File', item);
                    console.log('Click File', item.localPath);
                    let fileURL = `https://ipfs.jpgstoreapis.com/${item.cid}`;
                    Linking.openURL(fileURL).catch(err => console.error('An error occurred', err));
                  }}>
                  <Image source={require('../../assets/iconfile.jpg')} style={pageStyle.fileIconImageStyle}/>
                  <Text ellipsizeMode={'middle'} style={pageStyle.listFileNameTextStyle}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={pageStyle.warningTextDisplayTextStyle}>Please upload file</Text>
          )}
        </View>
      </View>
    );
  }
}
