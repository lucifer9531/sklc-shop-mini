import type { FC } from "react";
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtCard, AtButton, AtIcon } from 'taro-ui';
import './index.scss';

interface SupplierCardProps {
  shopName: string;
  title: string;
  lastOrderTime: string;
  phoneNumber: string;
  onViewShopInfo: () => void;
  isAdd?: boolean;
  onPlaceOrder?: () => void;
  addSupplier?: () => void;
}

const SupplierCard: FC<SupplierCardProps> = (
  {
    shopName,
    title,
    lastOrderTime,
    phoneNumber,
    onPlaceOrder,
    isAdd = false,
    onViewShopInfo,
  }
) => {
  const makePhoneCall = () => {
    Taro.makePhoneCall({phoneNumber});
  };

  return (
    <View className='supplier-card'>
      <AtCard
        // @ts-ignore
        extra={
          <Text
            className='view-shop-info'
            onClick={onViewShopInfo}
          >
            店铺信息
          </Text>
        }
        title={title}
      >
        <View className='content'>
          <Text>店名：{shopName}</Text>
          <Text>最近一次下单时间：{lastOrderTime}</Text>
        </View>
        <View className='operation-btn'>
          {
            !isAdd &&
            <AtButton type='secondary' size='small' circle>
              <AtIcon value='shopping-cart' size='18' color='#FF6600' className='icon' onClick={onPlaceOrder} />
              下单
            </AtButton>
          }
          <AtButton type='secondary' className='mobile-btn' size='small' circle onClick={makePhoneCall}>
            <AtIcon value='phone' size='18' className='icon' color='#0099CC' />
            电话联系
          </AtButton>
          {
            isAdd &&
            <AtButton type='secondary' className='mobile-btn' size='small' circle onClick={makePhoneCall}>
              <AtIcon value='phone' size='18' className='icon' color='#0099CC' />
              添加我为供应商
            </AtButton>
          }
        </View>
      </AtCard>
    </View>
  );
};

export default SupplierCard;
