import NavigationUtil from '../utils/navigation.util';
import BackendAPIs from './backend/backend.apis';

const errorHandler = {
  handleAPIException: async (error, reject) => {
    return NavigationUtil.showAlert({
      messageText: 'API Failed',
      onRightButtonPress: () => {
        reject(false);
      },
    });

  },
};

const backendInterface = {
  //Api to get file details
  uploadFile: async (data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        let response: string = await BackendAPIs.upload(data);
        resolve(response);
      } catch (error) {
        return errorHandler.handleAPIException(error, reject);
      }
    });
  },
};

export { backendInterface };
