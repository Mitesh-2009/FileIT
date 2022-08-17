import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';

const componentStyle = StyleSheet.create({
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: '#000000' + '7F',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
});

export { componentStyle };
