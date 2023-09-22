export default {
  pages: [
    'pages/splash/index',
    'pages/supplier/index',
    'pages/addSupplier/index',
    'pages/supplierInfo/index',
    'pages/oneClickOrder/index',
    'pages/order/index',
    'pages/center/index'
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
      sync: true
    }
  },
  tabBar: {
    backgroundColor: '#fff',
    borderStyle: 'black',
    selectedColor: '#2d8cf0',
    color: '#666',
    list: [
      {
        pagePath: "pages/supplier/index",
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png',
        text: "供应商"
      },
      {
        pagePath: "pages/order/index",
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png',
        text: "订单"
      },
      {
        pagePath: "pages/center/index",
        iconPath: './assets/images/tab_me.png',
        selectedIconPath: './assets/images/tab_me_s.png',
        text: "我的"
      },
    ]
  },
}
