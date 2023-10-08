import type { FC } from "react";
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtButton, AtTag } from "taro-ui";
import './index.scss';


interface SupplierCardProps {
  shopName: string;
  title: string;
  lastOrderTime: string;
  phoneNumber: string;
  tag?: string;
  onViewShopInfo: () => void;
  isAdd?: boolean;
  isBind?: boolean;
  onPlaceOrder?: () => void;
  addSupplier?: () => void;
}

const SupplierCard: FC<SupplierCardProps> = (
  {
    shopName,
    title,
    lastOrderTime,
    phoneNumber,
    tag,
    onPlaceOrder,
    isAdd = false,
    isBind = false,
    onViewShopInfo,
    addSupplier
  }
) => {
  const makePhoneCall = () => {
    Taro.makePhoneCall({phoneNumber});
  };

  return (
    <View className='supplier-card'>
      <View className='top-container'>
        <View className='shop'>
          <Text className='title'>{title}</Text>
          {
            tag &&
            <AtTag type='primary' size='small' className='tag' circle>{tag}</AtTag>
          }
        </View>
        <View className='details' onClick={onViewShopInfo}>
          <Image src={require('@/assets/images/shop.png')} className='shop-icon' />
          <Text className='check-in'>进店</Text>
        </View>
      </View>
      <View className='medium-container'>
        <Text>店名：{shopName}</Text>
        <Text>最近下单：{lastOrderTime}</Text>
      </View>
      <View className='bottom-container'>
        <View className='call-container' onClick={makePhoneCall}>
          <Image src={require('@/assets/images/call.png')} className='call-icon' />
          <Text className='phone-concat'>电话联系</Text>
        </View>
        <View>
          <AtButton onClick={isAdd ? addSupplier : onPlaceOrder} type='primary' size='small'>{ isAdd ? '添加我为供应商' : '下单' }</AtButton>
        </View>
      </View>
      {
        isBind &&
        <View className='bind-tag'>
          <Text className='bind-tag-text'>未绑定</Text>
        </View>
      }
    </View>
  )
}
export default SupplierCard;
