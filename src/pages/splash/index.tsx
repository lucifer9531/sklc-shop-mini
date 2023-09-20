import type { FC } from 'react';

import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useEffect, useState } from "react";
import { HOME_PAGE } from "@/consts";
import './index.scss';

const Splash: FC = () => {
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        redirectToHomePage();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const redirectToHomePage = () => {
    Taro.redirectTo({
      url: HOME_PAGE,
    });
  };

  const handleSkip = () => {
    redirectToHomePage();
  };

  return (
    <View className='splash-container'>
      <Button className='skip-button' onClick={handleSkip}>
        跳过 {countdown}s
      </Button>
    </View>
  );
};

export default Splash;
