import type { FC } from "react";
import Taro from '@tarojs/taro';
import { AtActivityIndicator, AtButton, AtDivider } from 'taro-ui';
import { View, Text, ScrollView } from "@tarojs/components";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { useEffect, useState } from "react";
import { navigateToTab } from "@/utils";
import { ADD_SUPPLIER_PAGE, ONE_CLICK_ORDER_PAGE, SUPPLIER_INFO_PAGE } from "@/constants";
import { useAsyncEffect } from "ahooks";
import OccupyingRow from "@/components/occupyingRow";
import { getSupplierOfUser } from "@/api/supplier";
import './index.scss';

const Index: FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{
    shopName: '太原市万柏林区牛肉商行',
    title: '牛肉商行',
    lastOrderTime: '2022-11-12 12:12:12',
    phoneNumber: '19828360146',
    tag: '22',
    id: '1',
  }, {
    shopName: '太原市万柏林区牛肉商行',
    title: '牛肉商行',
    lastOrderTime: '2022-11-12 12:12:12',
    phoneNumber: '19828360146',
    id: '2'
  }] as any[]);
  const [supplierCount, setSupplierCount] = useState<number>(0);

  useEffect(() => {
    setOrderBrade();
    Taro.eventCenter.on('dataAdded', handleDataAdded);
    return () => {
      Taro.eventCenter.off('dataAdded', handleDataAdded);
    };
  }, []);

  const setOrderBrade = () => {
    Taro.setTabBarBadge({
      index: 1,
      text: Taro.getStorageSync('orderCount') || '0',
    })
  };

  const handleDataAdded = async () => {
    await fetchData(1, true);
  };

  const fetchData = async (pageNo: number, clearData = false) => {
    try {
      setLoading(true);
      const { data: { data: { records, total } } } = await getSupplierOfUser({ pageNo, pageSize: 5 });
      if (clearData) setData(records);
      else setData((prevData) => [...prevData, ...records]);
      setSupplierCount(total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleScrollToLower = () => {
    if (!loading && data.length < supplierCount) {
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
      <OccupyingRow />
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
              tag={item.tag}
              shopName={item.shopName}
              title={item.title}
              lastOrderTime={item.lastOrderTime}
              phoneNumber={item.phoneNumber}
              onPlaceOrder={() => navigateToTab(`${ONE_CLICK_ORDER_PAGE}?id=${item.id}`)}
              onViewShopInfo={() => navigateToTab(SUPPLIER_INFO_PAGE)}
            />
          ))
        )}
        {loading && <AtActivityIndicator className='footer' content='加载中...' />}
        {
          data.length > 0 && data.length >= supplierCount &&
          <AtDivider className='footer' fontColor='#000' fontSize='28' content='没有更多了' />
        }
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
