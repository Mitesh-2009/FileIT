import React, { PureComponent } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { componentStyle } from './notchPush.style';

export type NotchPushComponentProps = {
  style?: StyleProp<ViewStyle>
}

export type NotchPushComponentState = {}

class NotchPushComponent extends PureComponent<NotchPushComponentProps, NotchPushComponentState> {
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[componentStyle.container, this.props.style]}/>
    );
  }
}

export { NotchPushComponent };
