import defHttp from '@/utils/http';

enum API {
  login = '/api/user/login',
}

export const login = (params: { [key: string]: any }) => {
  return defHttp.post(API.login, params);
};
