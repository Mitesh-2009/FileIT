import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';

const componentStyle = StyleSheet.create({
  container: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
  },
  iconStyle: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  labelStyle: {
    fontSize: 14,
  },
});

export { componentStyle };
