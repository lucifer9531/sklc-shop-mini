import Taro from "@tarojs/taro";

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
