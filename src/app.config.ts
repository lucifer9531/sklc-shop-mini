export default {
  pages: [
    'pages/splash/index',
    'pages/supplier/index/index',
    'pages/supplier/add/index',
    'pages/supplier/info/index',
    'pages/order/index/index',
    'pages/order/oneClickOrder/index',
    'pages/center/index/index',
    'pages/center/applyCheckIn/index',
    'pages/center/monthOrder/index',
    'pages/center/address/index',
    'pages/center/addressAdd/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '熟客来采',
    navigationBarTextStyle: 'black'
  },
  requiredPrivateInfos: [
    "getLocation",
    "onLocationChange",
    "startLocationUpdateBackground"
  ],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于获取您的当前位置",
    }
  },
  tabBar: {
    backgroundColor: '#fff',
    borderStyle: 'black',
    selectedColor: '#2d8cf0',
    color: '#666',
    list: [
      {
        pagePath: "pages/supplier/index/index",
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png',
        text: "供应商"
      },
      {
        pagePath: "pages/order/index/index",
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png',
        text: "订单"
      },
      {
        pagePath: "pages/center/index/index",
        iconPath: './assets/images/tab_me.png',
        selectedIconPath: './assets/images/tab_me_s.png',
        text: "我的"
      },
    ]
  },
}
