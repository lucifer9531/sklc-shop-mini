export default {
  pages: [
    'pages/splash/index',
    'pages/index/index',
    'pages/center/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '熟客来采',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    backgroundColor: '#fafafa',
    borderStyle: 'white',
    selectedColor: '#2d8cf0',
    color: '#8a8a8a',
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png',
        text: "首页"
      },
      {
        pagePath: "pages/center/index",
        iconPath: './assets/images/tab_me.png',
        selectedIconPath: './assets/images/tab_me_s.png',
        text: "个人"
      },
    ]
  },
}
