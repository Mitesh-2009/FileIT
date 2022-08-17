import { StyleSheet } from 'react-native';

const pageStyle = StyleSheet.create({
  submitButtonStyle: {
    paddingTop: 8,
    alignSelf: 'center',
  },
  todoTextInputStyle: {
    height: 48,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8,
  },
  textInputsContainerStyle: {
    backgroundColor: 'white',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingHorizontal: 8,
    paddingBottom: 16,
    height: 180,
  },
  crossButtonSubContainerStyle: {
    backgroundColor: 'white',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: 'white',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'flex-end',
    padding: 8,
  },
  modalContainerStyle: {
    backgroundColor: '#333333' + '4F',
    flexGrow: 1,
    justifyContent: 'center',
  },
  warningTextStyle: {
    alignSelf: 'center',
    marginTop: 50,
  },
  listTextStyle: {
    margin: 3,
    alignItems: 'center',
    textAlign: 'center',
  },
  listTextContainer: {
    borderWidth: 1,
    borderColor: '#000000' + '9F',
    margin: 4,
  },
  listStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  hashTextStyle: {
    color: 'black',
  },
  addTodoButtonStyle: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    marginHorizontal: 4,
  },
});

export { pageStyle };
