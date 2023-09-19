import request from '@/utils/request';

enum API {
  PanelList = 'xxx',
}

export const panelList = async (params: { [key: string]: any }) => {
  return request(API.PanelList, {
    method: 'GET',
    params,
  });
};
