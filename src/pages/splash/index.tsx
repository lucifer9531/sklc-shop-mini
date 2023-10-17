import type { FC } from 'react';

import { View, Text, Image } from '@tarojs/components';
import { useMount } from "ahooks";
import { HOME_PAGE, PRO_SUB_TITLE, PRO_TITLE, USER_CENTER_PAGE } from "@/constants";
import { switchTab } from "@/utils";
import { checkLogin } from "@/utils/user";
import './index.scss';

const Splash: FC = () => {

  useMount(async () => {
    await judgeIsLogin();
  });

  const judgeIsLogin = async () => {
    const isLogin = await checkLogin();
    switchTab(isLogin ? HOME_PAGE : `${USER_CENTER_PAGE}?isLogin=${isLogin}`);
  }

  return (
    <View className='welcome'>
      <View className='title-wrapper'>
        <View className='circle'>
          <Text className='title'>{PRO_TITLE}</Text>
        </View>
        <Text className='sub-title'>{PRO_SUB_TITLE}</Text>
      </View>
      <View className='loading-wrapper'>
        <Image src={require('@/assets/images/loading.png')} className='loading-icon' />
        <Text className='loading-text'>Loading...</Text>
      </View>
    </View>
  );
};

export default Splash;
