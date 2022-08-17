import React, { Component } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';

class BaseModal extends Component {
  backButtonCanClose: boolean;

  constructor(props, backButtonCanClose: boolean = true) {
    super(props);
    this.backButtonCanClose = backButtonCanClose;
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
    BackHandler.addEventListener('hardwareBackPress', this._backButtonClose);
  }

  componentWillUnmount() {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
    BackHandler.removeEventListener('hardwareBackPress', this._backButtonClose);
  }

  _backButtonClose = async () => {
    if (this.backButtonCanClose) {
      return !!this.props.onDismiss ? this._onDismiss() : this.close();
    } else {
      return {};
    }
  };

  close = async () => {
    return Navigation.dismissOverlay(this.props.componentId).catch(() => null);
  };
}

export { BaseModal };
