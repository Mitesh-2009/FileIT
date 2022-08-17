import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const pageStyle = StyleSheet.create({
  warningTextStyle: {
    alignSelf: 'center',
    marginTop: 50,
  },
  listItemImageStyle: {
    width: (screenWidth - 32) / 3,
    height: (screenWidth - 32) / 3,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#000000' + '9F',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  listStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  hashTextStyle: {
    color: 'black',
  },
  uploadButtonStyle: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    marginHorizontal: 4,
  },
});

export { pageStyle };
