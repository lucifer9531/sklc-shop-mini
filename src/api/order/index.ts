import defHttp from '@/utils/http';

enum API {
  orderList = '/api/order',
}

export const getOrderList = (params: { [key: string]: any }) => {
  return defHttp.get(API.orderList, params);
};

export const addOrder = (params: { [key: string]: any }) => {
  return defHttp.post(API.orderList, params);
};
