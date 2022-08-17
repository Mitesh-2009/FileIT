import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { componentStyle } from './standardTextInput.style';

export type StandardTextInputProps = {
  ...TextInput.propTypes,
  style?: any,
}

export type StandardTextInputState = {}

class StandardTextInput extends PureComponent<StandardTextInputProps, StandardTextInputState> {
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
  }

  focus() {
    this.textInput.focus();
  }

  componentDidMount = () => {
    if (this.textInput) {
      this.textInput.setNativeProps({style: {fontFamily: 'white'}});
    }
  };

  render() {
    return (
      <TextInput
        {...this.props}
        ref={input => this.textInput = input}
        caretHidden={false}
        style={[componentStyle.textInput, this.props.style]}
      />
    );
  }
}

export { StandardTextInput };

