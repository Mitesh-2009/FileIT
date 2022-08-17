import React from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { store } from './src/config/reduxStore/configure.store';
import screenId from './src/constants/screen.id.enum';
import { ActionModal, CommonAlert, ProgressIndicator, SimpleSelector } from './src/screens/common/modals';
import { DocsPageWithRedux } from './src/screens/docs';
import { PhotosPageWithRedux } from './src/screens/photos';
import { TodoPageWithRedux } from './src/screens/todo';
import NavigationUtil from './src/utils/navigation.util';

export class App {
  constructor() {
    this._registerComponents();
    Navigation.events().registerAppLaunchedListener(async () => {
      await this._setGlobalProperties();
      NavigationUtil.setDefaultOptions();
      await NavigationUtil.goToBottomTabsMain();
    });
  }

  _registerComponents() {
    Navigation.registerComponent(screenId.Todo.Page, () => this.getComponentProvider(TodoPageWithRedux));
    Navigation.registerComponent(screenId.Photos.Page, () => this.getComponentProvider(PhotosPageWithRedux));
    Navigation.registerComponent(screenId.Docs.Page, () => this.getComponentProvider(DocsPageWithRedux));

    Navigation.registerComponent(screenId.Overlays.CommonAlert, () => CommonAlert);
    Navigation.registerComponent(screenId.Overlays.ProgressIndicator, () => ProgressIndicator);
  }

  getComponentProvider = (Component) => ((props) => (<Provider store={store}><Component{...props} /></Provider>));


  _setGlobalProperties = async (): void => {
    // hide status bar
    StatusBar.setHidden(false);

    store.subscribe(async () => {
      let state = store.getState();
      if (state.commonDataStore.progressIndicator === 1 && !state.commonDataStore.showingProgressIndicator) {
        return NavigationUtil.showProgressIndicator();
      }
    });
  };
}
