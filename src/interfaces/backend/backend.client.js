import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';
import { store } from '../../config/reduxStore/configure.store';
import { hideProgress, showProgress } from '../../config/reduxStore/reducers';

class BackendClient {
  static client = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: 'https://api.web3.storage/',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFiQWY2QjBlMjVlNTJiOWI3RDI2Qjg0QTBFRjc1RjY3MDdmMzM5RjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTg1NzEwMTgyNTIsIm5hbWUiOiJjcnlwdGljV29ybGQifQ.RKhbhKkZ4ZhKmKaSViCkHmP9tO9VQ1_7B8SI1l0ZyFY',
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'});
      },
    });

    // intercept request
    instance.interceptors.request.use((config) => {
      store.dispatch(showProgress());

      // log the request
      console.log('%cRequest:', 'color: ' + '#33CCCC' + 'AF' + '; font-weight: bold', {
        address: `${config.baseURL}${config.url}`,
        requestBody: config.data,
      });

      // return the request config
      return config;
    }, function (error) {
      store.dispatch(hideProgress());
      return Promise.reject(error);
    });

    // intercept response
    instance.interceptors.response.use(async (response) => {
      // log the response
      console.log('%cResponse:', 'color: ' + 'red' + 'AF' + '; font-weight: bold', {
        address: `${response.config.baseURL}${response.config.url}`,
        responseBody: response.data,
      });

      store.dispatch(hideProgress());

      return Promise.resolve(response);

    }, (error) => {
      console.log('%cError Response:', 'color: ' + 'red' + 'AF' + '; font-weight: bold', {
        address: `${error.response.config.baseURL}${error.response.config.url}`,
        responseBody: error.response.data,
      });

      store.dispatch(hideProgress());

      return Promise.reject(error);
    });

    return instance;
  };
}

const BackendClientInstance = BackendClient.client();

export { BackendClientInstance };
