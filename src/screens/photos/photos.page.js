import React from 'react';
import { FlatList, Image, Platform, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { backendInterface } from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import AsyncstorageUtil from '../../utils/asyncstorage.util';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import { BasePage } from '../common/base.page';
import { StandardButton } from '../common/components';
import { NotchPushComponent } from '../common/components/basic';
import { pageStyle } from './photos.page.style';

const FormData = require('form-data');

const imagePickerConfig = {
  width: 1024,
  height: 1024,
  cropping: false,
  cropperCircleOverlay: true,
  compressImageMaxWidth: 1024,
  compressImageMaxHeight: 1024,
  compressVideoPreset: 'MediumQuality',
  mediaType: 'photo',
  includeBase64: true,
  includeExif: true,
  compressImageQuality: 0.7,
};

export default class PhotosPage extends BasePage {
  constructor(props) {
    super(props, {
      photoHash: '',
      photo: [],
    }, true);
  }

  componentDidAppear = () => {
    super.componentDidAppear();
    console.log('Photo Call componentDidAppear');
    AsyncStorageUtil.getItem('ImagesArray').then((value) => {
      let arrVal = JSON.parse(value);
      console.log('ImagesArray Async:-', arrVal);
      if (!!arrVal) {
        this.setState({
          photo: arrVal,
        });
      }
    });
  };

  componentDidDisappear = () => {
    super.componentDidDisappear();
    console.log('Photo Call componentDidDisappear');
    AsyncstorageUtil.setItem('ImagesArray', this.state.photo).catch(() => null);
  };

  pressUploadButton = () => {
    console.log('Click Upload Gallery Button');
    ImagePicker.openPicker(imagePickerConfig)
      .then(async image => {
        console.log('image data:-', image);
        let n = image.path.lastIndexOf('/');
        let imageName = image.path.substring(n + 1);
        console.log('Image Name:-', imageName);
        const dataImage = new FormData();
        const ImagePath = Platform.OS === 'android' ? `file://${image.path}` : image.path;
        dataImage.append('file', {
          uri: ImagePath,
          type: image.mime,
          name: !!imageName ? imageName : 'test.jpg',
        });
        console.log('Image data:-', dataImage);
        if (!!image) {
          await backendInterface.uploadFile(dataImage)
            .then((response) => {
              console.log('GET CID:-', response.cid);
              let imageItem = {
                name: '',
                cid: '',
              };
              imageItem.name = !!imageName ? imageName : 'test.jpg';
              imageItem.cid = response.cid;
              console.log('imageItem:-', imageItem);
              this.setState({
                photo: [...this.state.photo, imageItem],
                photoHash: response.cid,
              }, () => {
                console.log('Photos:-', this.state.photo);
                console.log('1 st Photo URL:-', `https://ipfs.jpgstoreapis.com/${this.state.photo[0].cid}`);
              });
            }).catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log('Error Upload:-', error);
      });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent/>
        <View style={pageStyle.contentContainerStyle}>
          <StandardButton
            labelText={'Upload form Gallery'}
            onPress={() => {
              this.pressUploadButton();
            }}
            width={'50%'}
            color={'#6DBF8B'}
            style={pageStyle.uploadButtonStyle}
          />
          {!!this.state.photoHash ?
            <Text style={pageStyle.hashTextStyle}>Content Identifier(CID):-{this.state.photoHash}</Text>
            : null}
          {this.state.photo.length > 0 ? (
            <FlatList
              numColumns={3}
              style={pageStyle.listStyle}
              scrollEnabled={true}
              data={this.state.photo}
              renderItem={({item, index}) => (
                <Image source={{uri: `https://ipfs.jpgstoreapis.com/${item.cid}`}} style={pageStyle.listItemImageStyle}/>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={pageStyle.warningTextStyle}>Please upload file</Text>
          )}
        </View>
      </View>
    );
  }
}
