import type { FC } from "react";
import Taro from '@tarojs/taro';
import { useMount } from "ahooks";
import './app.scss';

const App: FC = (props: any) => {

  useMount(() => {
    updateApp();
  });

  const updateApp = () => {
    if (process.env.TARO_ENV !== 'weapp') return;
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (!res.hasUpdate) return;
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (resp) => {
            resp.confirm && updateManager.applyUpdate();
          }
        });
      });
    });
  };

  return props.children;
}

export default App;
