import type { FC } from "react";
import Taro from '@tarojs/taro';
import { AtActivityIndicator, AtButton } from 'taro-ui';
import { View, Text, ScrollView } from "@tarojs/components";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { useState } from "react";
import { navigateToTab } from "@/utils";
import { ADD_SUPPLIER_PAGE, ONE_CLICK_ORDER_PAGE, SUPPLIER_INFO_PAGE } from "@/consts";
import { useAsyncEffect } from "ahooks";
import './index.scss';

const Index: FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{
    shopName: '太原市万柏林区牛肉商行',
    title: '牛肉商行',
    lastOrderTime: '2022-11-12 12:12:12',
    phoneNumber: '19828360146',
  }, {
    shopName: '太原市万柏林区牛肉商行',
    title: '牛肉商行',
    lastOrderTime: '2022-11-12 12:12:12',
    phoneNumber: '19828360146',
  }] as any[]);

  // TODO: 对接接口
  const fetchData = async (pageNum: number) => {
    try {
      const response = await fetch(`https://api.example.com/data?page=${pageNum}`);
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleScrollToLower = () => {
    if (!loading) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  useAsyncEffect(async () => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    await fetchData(page);
  }, [page]);

  return (
    <View className='supplier-container'>
      <AtButton
        className='add-btn'
        type='primary'
        size='normal'
        onClick={() => navigateToTab(ADD_SUPPLIER_PAGE)}
      >
        添加供应商
      </AtButton>
      <View className='space'></View>
      <ScrollView
        scrollY
        onScrollToLower={handleScrollToLower}
        style={{ height: '550px' }}
      >
        <View className='my-shop'>我的供应商</View>
        {data.length === 0 ? (
          <Empty>没有供应商，请添加</Empty>
        ) : (
          data.map((item, index) => (
            <SupplierCard
              key={index}
              shopName={item.shopName}
              title={item.title}
              lastOrderTime={item.lastOrderTime}
              phoneNumber={item.phoneNumber}
              onPlaceOrder={() => {}}
              onViewShopInfo={() => navigateToTab(SUPPLIER_INFO_PAGE)}
            />
          ))
        )}
        {loading && <AtActivityIndicator content='加载中...' />}
      </ScrollView>
      {
        data.length > 0 &&
        <View className='order-container' onClick={() => navigateToTab(ONE_CLICK_ORDER_PAGE)}>
          <Text className='order-text'>一键下单</Text>
        </View>
      }
    </View>
  )
}

export default Index;
