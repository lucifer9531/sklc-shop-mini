import defHttp from '@/utils/http';

enum API {
  RegionList = '/v3/config/district',
  LocationList = '/v3/geocode/regeo',
}

export const getRegion = (params: { [key: string]: any }) => {
  return defHttp.get(API.RegionList, params);
};

export const getLocation = (params: { [key: string]: any }) => {
  return defHttp.get(API.LocationList, params);
};
