import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const pageStyle = StyleSheet.create({
  uploadDocumentButtonStyle: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  hashTextStyle: {
    color: 'black',
  },
  listStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  listItemButtonStyle: {
    width: (screenWidth - 32) / 3,
    borderWidth: 1,
    borderColor: '#000000' + '9F',
    margin: 4,
  },
  fileIconImageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    margin: 4,
  },
  listFileNameTextStyle: {
    margin: 3,
    alignItems: 'center',
    textAlign: 'center',
  },
  warningTextDisplayTextStyle: {
    alignSelf: 'center',
    marginTop: 50,
  },
});

export { pageStyle };
