import Taro from "@tarojs/taro"

const customInterceptor = (chain: any) => {
  const requestParams = chain.requestParams;
  requestParams.url.includes('/api/') && (requestParams.url = requestParams.url.replace(/\/api\//, '/'));
  let token = Taro.getStorageSync('token') || '';
  requestParams.header = {
    ...requestParams.header,
    token,
    platformType: 1,
  }
  return chain.proceed(requestParams).then((res: any) => {
    return res;
  });
}

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
