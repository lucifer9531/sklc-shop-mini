import defHttp from '@/utils/http';

enum API {
  dictList = '/api/dictionary',
}

export const getDictValueByKey = (params: { [key: string]: any }) => {
  return defHttp.get(API.dictList, params);
};
