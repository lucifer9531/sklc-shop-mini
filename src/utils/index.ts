import Taro from "@tarojs/taro";
import { GD_KEY } from "@/consts";

export function switchTab (route: string) {
  Taro.switchTab({
    url: route,
  });
}

export function navigateToTab (route: string) {
  Taro.navigateTo({
    url: route,
  });
}

export async function getLocationInfo(): Promise<{ province: string | null; city: string | null; district: string | null }> {
  return new Promise<{ province: string | null; city: string | null; district: string | null }>((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02',
      success: async (res) => {
        try {
          const response = await Taro.request({
            url: `https://restapi.amap.com/v3/geocode/regeo?location=${res.longitude},${res.latitude}&key=${GD_KEY}`,
            method: 'GET',
          });
          const { province, city, district } = response?.data?.regeocode?.addressComponent;
          resolve({
            province,
            city,
            district,
          });
        } catch (error) {
          reject(error);
        }
      },
      fail: () => {
        Taro.showModal({
          title: '授权请求',
          content: '为了提供更好的服务，请允许我们获取您的地理位置信息。',
          confirmText: '去授权',
          cancelText: '拒绝',
          success: (tip) => {
            if (tip.confirm) {
              Taro.openSetting();
            } else if (tip.cancel) {
              reject(new Error('用户拒绝授权'));
            }
          },
        });
      },
    });
  });
}
