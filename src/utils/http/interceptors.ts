import Taro from "@tarojs/taro"

const customInterceptor = (chain: any) => {
  const requestParams = chain.requestParams;
  // let token = Taro.getStorageSync('TOKEN');
  // requestParams.header = {
  //   ...requestParams.header,
  //   Authorization: 'Bearer ' + token,
  // }
  return chain.proceed(requestParams).then((res: any) => {
    return res;
  });
}

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
