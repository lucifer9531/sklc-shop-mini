import type { FC } from "react";
import { ScrollView, View } from "@tarojs/components";
import RegionPicker from "@/components/regionPicker";

import { AtActivityIndicator, AtButton, AtInput } from "taro-ui";
import { useState } from "react";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { getLocationInfo, navigateToTab } from "@/utils";
import { SUPPLIER_INFO_PAGE } from "@/consts";
import Taro from "@tarojs/taro";
import { useAsyncEffect } from "ahooks";
import './index.scss';

const AddSupplier: FC = () => {

  const [shopName, setShopName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as any[]);
  const [address, setAddress] = useState<any>([]);

  useAsyncEffect(async () => {
    const { province, city, district} = await getLocationInfo();
    setAddress([province, city, district]);
  }, []);

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

  useAsyncEffect(async () => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    await fetchData(page);
  }, [page]);

  const handleScrollToLower = () => {
    if (!loading) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  return (
    <View>
      {
        address.length > 0 &&
        <RegionPicker onRegionChange={() => {}} initialLocation={address} />
      }
      <AtInput
        name='shopName'
        title='店名'
        type='text'
        placeholder='店铺名称'
        value={shopName}
        onChange={() => setShopName}
      />
      <AtButton className='search-btn' type='primary' size='normal'>查询</AtButton>
      {
        data.length > 0 &&
        <>
          <View className='space'></View>
          <View className='result'>查询结果</View>
        </>
      }
      <ScrollView
        scrollY
        onScrollToLower={handleScrollToLower}
        style={{ height: '450px' }}
      >
        {data.length === 0 ? (
          <Empty>当前无供应商</Empty>
        ) : (
          data.map((item, index) => (
            <SupplierCard
              key={index}
              isAdd
              shopName={item.shopName}
              title={item.title}
              lastOrderTime={item.lastOrderTime}
              phoneNumber={item.phoneNumber}
              addSupplier={() => {}}
              onViewShopInfo={() => navigateToTab(SUPPLIER_INFO_PAGE)}
            />
          ))
        )}
        {loading && <AtActivityIndicator content='加载中...' />}
      </ScrollView>
    </View>
  )
}

export default AddSupplier;
