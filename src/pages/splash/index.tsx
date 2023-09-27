import type { FC } from 'react';

import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { useMount } from "ahooks";
import { HOME_PAGE, PRO_SUB_TITLE, PRO_TITLE } from "@/consts";
import { switchTab } from "@/utils";
import './index.scss';

const Splash: FC = () => {

  useMount(async () => {
    await getUserInfo();
  })

  const getUserInfo = async () => {
    try {
      // TODO:
      const { userInfo } = await Taro.getUserInfo();
      console.log(userInfo);
    } catch (error) {
      console.error('获取用户信息失败：', error);
    } finally {
      switchTab(HOME_PAGE);
    }
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
