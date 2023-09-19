export default {
  pages: [
    'pages/splash/index',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '熟客来采',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    selectedColor: '#AB956D',
    color: '#666',
    list: [
      {
        pagePath: "pages/index/index",
        // iconPath: './static/images/home.png',
        // selectedIconPath: './static/images/home@selected.png',
        text: "首页"
      },
      {
        pagePath: "pages/splash/index",
        // iconPath: './static/images/category.png',
        // selectedIconPath: './static/images/category@selected.png',
        text: "测试"
      },
    ]
  },
}
