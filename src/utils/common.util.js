//Please add an common utility methods here
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const commonUtil = {
  isDeviceHasNotch: () => {
    let result = false;

    if (Platform.OS === 'android' && StatusBar.currentHeight > 24) {
      result = true;
    } else if (Platform.OS === 'ios') {
      result = DeviceInfo.hasNotch();
    }
    return result;
  },

  trimString: (string) => {
    return string.replace(/^\s+|\s+$/g, '');
  },
};

export default commonUtil;
