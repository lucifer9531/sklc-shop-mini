import type { FC } from "react";
import Taro from '@tarojs/taro';
import { AtActivityIndicator, AtButton, AtFab } from 'taro-ui';
import { View, Text, ScrollView } from "@tarojs/components";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { useEffect, useState } from "react";
import { navigateToTab } from "@/utils";
import { ADD_SUPPLIER_PAGE, ONE_CLICK_ORDER_PAGE, SUPPLIER_INFO_PAGE } from "@/consts";
import './index.scss';

const Index: FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as any[]);

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

  useEffect(() => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    fetchData(page);
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
      <ScrollView
        scrollY
        onScrollToLower={handleScrollToLower}
        style={{ height: '550px' }}
      >
        <View className='at-article__h2' style={{ marginBottom: '10px' }}>我的供应商</View>
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
        <AtFab className='fab-btn' onClick={() => navigateToTab(ONE_CLICK_ORDER_PAGE)}>
          <Text style={{ width: '40px' }}>一键下单</Text>
        </AtFab>
      }
    </View>
  )
}

export default Index;
