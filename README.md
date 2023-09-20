## 熟客来采

### 广告位
后期可考虑可考虑接入广告，暂时无法申请广告位, UV > 1000
```javascript

useEffect(() => {
  loadInterstitialAd();
}, []);

const loadInterstitialAd = () => {
  let interstitialAd = Taro.createInterstitialAd({
    adUnitId: 'adunit-xxx',
  });
  interstitialAd.load().then(() => {
    interstitialAd.show().catch((err) => {
      console.error('展示插屏广告失败', err);
    });
  }).catch((err) => {
    console.error('加载插屏广告失败', err);
  });

  interstitialAd.onClose(() => {

  });

  return () => {
    if (interstitialAd) {
      interstitialAd.destroy();
    }
  };
};
```
