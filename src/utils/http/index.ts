import Taro from '@tarojs/taro';
import getBaseUrl from './baseUrl';
import interceptors from './interceptors';

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class httpRequest {

  baseOptions(params: { [key: string]: any }, method = "GET") {
    let { url, data } = params;
    const contentType = params.contentType || "application/json";
    const option: any = {
      url: `${getBaseUrl(url)}${url}`,
      data,
      method,
      header: {
        'content-type': contentType,
      }
    };
    return Taro.request(option);
  }

  get(url: string, data?: any) {
    return this.baseOptions({ url, data });
  }

  post(url: string, data?: any, contentType?: string) {
    return this.baseOptions({ url, data, contentType }, "POST");
  }

  put(url: string, data?: any) {
    return this.baseOptions({ url, data }, "PUT");
  }

  delete(url: string, data?: any) {
    return this.baseOptions({ url, data }, "DELETE");
  }
}

export default new httpRequest();
