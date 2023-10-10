import type { FC } from "react";
import { Button, View } from '@tarojs/components'
import './index.scss';

interface PhoneNumberProps {
  onGetPhoneNumber: (e: any) => void;
}

const PhoneNumber: FC<PhoneNumberProps> = (props) => {
  return (
    <View>
      <Button className='user_column_item_phone' openType='getPhoneNumber' onGetPhoneNumber={props.onGetPhoneNumber}>
        {props.children}
      </Button>
    </View>
  )
}

export default PhoneNumber;
