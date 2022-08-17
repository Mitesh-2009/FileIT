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
  container: {
    ...commonStyle.modalContainer,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  listView: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  closeButton: {
    backgroundColor: 'green',
    borderRadius: 16,
    end: 0,
    margin: 8,
    padding: 8,
    position: 'absolute',
    top: 0,
  },
  buttonStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  titleCloseButtonContainer: {
    backgroundColor: 'white',
    height: 40,
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 8,
  },
  titleTextStyle: {
    color: 'black',
    textAlign: 'center',
  },
  closeButtonImage: {
    height: 8,
    tintColor: 'white',
    width: 8,
  },
  messageMainContainer: {
    backgroundColor: 'white',
    flexShrink: 1,
    paddingVertical: 8,
  },
  messageSubContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 96,
  },
  messageTextStyle: {
    textAlign: 'center',
  },
  messageDebugContainer: {
    padding: 16,
  },
});

export { componentStyle };
