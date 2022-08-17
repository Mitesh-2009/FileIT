import { BackendClientInstance } from './backend.client';

export default class BackendAPIs {
  static upload(data: any) {
    return BackendClientInstance.post('upload', data, {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      return response.data;
    });
  }
}
