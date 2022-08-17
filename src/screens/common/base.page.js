import React, { Component } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import NavigationUtil from '../../utils/navigation.util';

class BasePage extends Component {
  _isMounted = false;
  _handleBackButton: boolean;
  _backButtonHandler: any = null;

  constructor(props, state = {}, handleBackButton: boolean = false) {
    super(props);
    this.state = {
      ...state,
    };
    this._isMounted = true;
    this._handleBackButton = handleBackButton;

    // this is only required when we are required to listen to events like `componentDidAppear` and `componentDidDisappear`
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  _exitApp = async () => {
    BackHandler.exitApp();
  };

  componentDidAppear() {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
    NavigationUtil.dismissAllOverlay().catch(() => null);
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.addEventListener('hardwareBackPress', this._backButtonHandler);
    }
  };

  componentDidDisappear() {
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.removeEventListener('hardwareBackPress', this._backButtonHandler);
    }
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    this._isMounted = false;
  }

}

export { BasePage };
