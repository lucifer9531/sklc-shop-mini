import type { FC } from "react";
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui";
import { transportStatusEnum } from "@/enums/transportStatus";
import { payStatusEnum } from "@/enums/payStatus";
import './index.scss';


interface SupplierCardProps {
  id: string | number;
  title: string;
  orderTime: string;
  deliveryTime: string;
  money?: number;
  transportStatus: string;
  payStatus: string;
  payCallBack?: () => void;
  onViewShopInfo: () => void;
  disabled?: boolean;
}

const SupplierCard: FC<SupplierCardProps> = (
  {
    title,
    orderTime,
    deliveryTime,
    money,
    transportStatus,
    payStatus,
    payCallBack,
    onViewShopInfo,
    disabled = false,
  }
) => {
  return (
    <View className='supplier-card'>
      <View className='top-container'>
        <Text className='title'>{title}</Text>
        <View className='top-container-right'>
          {
            [transportStatus, payStatus].map((item, index) => (
              <View key={index} className='details'>
                <Text className='check-in'>{ item }</Text>
              </View>
            ))
          }
        </View>
      </View>
      <View className='medium-container'>
        <Text>下单时间：{orderTime}</Text>
        <Text>要求送达时间：{deliveryTime}</Text>
        {
          money &&
          <Text>总金额：{money}元</Text>
        }
      </View>
      <View className='bottom-container'>
        {
          transportStatus === transportStatusEnum.TO_BE_DELIVERED && payStatus === payStatusEnum.TO_BE_PAID &&
          <View>
            <AtButton disabled={disabled} onClick={payCallBack} className='paid' size='small'>我已支付</AtButton>
          </View>
        }
       <View>
         <AtButton onClick={onViewShopInfo} type='primary' size='small'>查看订单</AtButton>
       </View>
      </View>
    </View>
  )
}
export default SupplierCard;
