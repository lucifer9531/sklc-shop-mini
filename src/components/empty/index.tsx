import type { FC } from "react";
import { View } from '@tarojs/components';
import './index.scss';

const Empty: FC = (props) => {
  return (
    <View className='empty'>
      {props.children}
    </View>
  );
}

export default Empty;
