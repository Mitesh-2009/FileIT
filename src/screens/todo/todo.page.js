import React from 'react';
import { FlatList, Modal, Platform, Text, View } from 'react-native';
import { backendInterface } from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import AsyncstorageUtil from '../../utils/asyncstorage.util';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import { BasePage } from '../common/base.page';
import { StandardButton, StandardTextInput } from '../common/components';
import { NotchPushComponent } from '../common/components/basic';
import { pageStyle } from './todo.page.style';

const RNFS = require('react-native-fs');

export default class TodoPage extends BasePage {
  constructor(props) {
    super(props, {
      enteredToDoTitle: '',
      enteredToDo: '',
      isAddTODO: false,
      todoHash: '',
      todos: [],
    }, true);
    this.inputs = {};
  }

  componentDidAppear = () => {
    super.componentDidAppear();
    console.log('Todo Call componentDidAppear');
    AsyncStorageUtil.getItem('todoArray').then((value) => {
      let arrVal = JSON.parse(value);
      console.log('DocsArray Async:-', arrVal);
      if (!!arrVal) {
        this.setState({
          todos: arrVal,
        });
      }
    });
  };

  componentDidDisappear = () => {
    super.componentDidDisappear();
    console.log('Todo Call componentDidDisappear');
    AsyncstorageUtil.setItem('todoArray', this.state.todos).catch(() => null);
  };

  createFile = (fileName: string, jsonStrings: string) => {
    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    let path = RNFS.DocumentDirectoryPath + `/${fileName}.json`;
    // write the file
    RNFS.writeFile(path, jsonStrings, 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
        this.readFile(`${fileName}.json`, jsonStrings);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  readFile = (fileName: string, jsonStrings: string) => {
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(async (result) => {
        console.log('GOT RESULT', result);
        console.log('GOT RESULT 0 path:-', result[0].path);
        console.log('GOT RESULT 0 name:-', result[0].name);
        let searchData = result.find(data => data.name === fileName);
        console.log('searchData:-', searchData);
        console.log('searchData name:-', searchData.name);
        const dataFile = new FormData();
        const filePath = Platform.OS === 'android' ? `file://${searchData.path}` : searchData.path;
        dataFile.append('file', {
          uri: filePath,
          type: 'application/json',
          name: fileName,
        });
        console.log('File data:-', dataFile);
        if (!!dataFile) {
          await backendInterface.uploadFile(dataFile)
            .then((response) => {
              console.log('GET CID:-', response.cid);
              let todoDetail = JSON.parse(jsonStrings);
              let fileItem = {
                title: '',
                description: '',
                name: '',
                cid: '',
                localPath: '',
              };
              fileItem.title = todoDetail.title;
              fileItem.description = todoDetail.description;
              fileItem.name = fileName;
              fileItem.cid = response.cid;
              fileItem.localPath = filePath;
              console.log('fileItem:-', fileItem);
              this.setState({
                todos: [...this.state.todos, fileItem],
                todoHash: response.cid,
                enteredToDoTitle: '',
                enteredToDo: '',
              }, async () => {
                await this.deleteFile(searchData.name);
                console.log('todos:-', this.state.todos);
                console.log('1 st File URL:-', `https://ipfs.jpgstoreapis.com/${this.state.todos[0].cid}`);
              });
            }).catch((error) => {
              console.log(error);
            });
        }
        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }
        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log('file contents:-', contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  };

  deleteFile = (fileName: string) => {
    console.log('dele fileName:-', fileName);
    let path = RNFS.DocumentDirectoryPath + `/${fileName}`;
    console.log('Path for Deletion:-', path);
    return RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent/>
        <View style={pageStyle.contentContainerStyle}>
          <StandardButton
            labelText={'Add TODO'}
            onPress={() => {
              this.setState({
                isAddTODO: true,
              });
            }}
            width={'50%'}
            color={'#6DBF8B'}
            style={pageStyle.addTodoButtonStyle}
          />
          {!!this.state.todoHash ?
            <Text style={pageStyle.hashTextStyle}>Content Identifier(CID):-{this.state.todoHash}</Text>
            : null}
          {this.state.todos.length > 0 ? (
            <FlatList
              style={pageStyle.listStyle}
              scrollEnabled={true}
              data={this.state.todos}
              renderItem={({item, index}) => (
                <View style={pageStyle.listTextContainer}>
                  <Text ellipsizeMode={'middle'} style={pageStyle.listTextStyle}>{item.title}</Text>
                  <Text ellipsizeMode={'middle'} style={pageStyle.listTextStyle}>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={pageStyle.warningTextStyle}>Please Add Todo</Text>
          )}
        </View>
        <>
          {!!this.state.isAddTODO &&
            <Modal transparent animationType="none" visible={this.state.isAddTODO}>
              <View style={pageStyle.modalContainerStyle}>
                <View style={pageStyle.crossButtonSubContainerStyle}>
                  <StandardButton
                    labelText={'X'}
                    width={'10%'}
                    onPress={() => {
                      this.setState({
                        isAddTODO: false,
                      });
                    }}
                  />
                </View>
                <View style={pageStyle.textInputsContainerStyle}>
                  <StandardTextInput
                    ref={(ref) => {
                      this.inputs['todoTitleTextInput'] = ref;
                    }}
                    style={pageStyle.todoTextInputStyle}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder={'Enter Todo Title'}
                    placeholderTextColor={'#999999'}
                    onChangeText={(value) => {
                      this.setState({
                        enteredToDoTitle: value,
                      });
                    }}
                    onSubmitEditing={async () => {
                    }}
                    value={this.state.enteredToDoTitle}/>
                  <StandardTextInput
                    ref={(ref) => {
                      this.inputs['todoTextInput'] = ref;
                    }}
                    style={pageStyle.todoTextInputStyle}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder={'Enter Todo'}
                    placeholderTextColor={'#999999'}
                    onChangeText={(value) => {
                      this.setState({
                        enteredToDo: value,
                      });
                    }}
                    onSubmitEditing={async () => {
                    }}
                    value={this.state.enteredToDo}/>
                  <StandardButton
                    style={pageStyle.submitButtonStyle}
                    labelText={'Submit'}
                    width={'20%'}
                    onPress={() => {
                      if (!!this.state.enteredToDo && !!this.state.enteredToDoTitle) {
                        this.setState({
                          isAddTODO: false,
                        }, () => {
                          let todoDetails = {'title': this.state.enteredToDoTitle, 'description': this.state.enteredToDo};
                          let todoDetailsString = JSON.stringify(todoDetails);
                          console.log('todoDetailsString:-', todoDetailsString);
                          this.createFile(this.state.enteredToDoTitle, todoDetailsString);
                        });
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>}
        </>
      </View>
    );
  }
}
