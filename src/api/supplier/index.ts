import defHttp from '@/utils/http';

enum API {
  supplierOfUser = '/api/user-supplier-relationship',
  supplierList = '/api/supplier',
  bindSupplier = '/api/user-supplier-relationship/bind'
}

export const getSupplierOfUser = (params: { [key: string]: any }) => {
  return defHttp.get(API.supplierOfUser, params);
};


export const getSupplier = (params: { [key: string]: any }) => {
  return defHttp.get(API.supplierList, params);
}

export const bindSupplier = (params: { [key: string]: any }) => {
  return defHttp.post(API.bindSupplier, params);
}
