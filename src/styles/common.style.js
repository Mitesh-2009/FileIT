import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flexShrink: 1,
    overflow: 'hidden',
    width: '100%',
  },
  modalScreenContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export { commonStyle };
