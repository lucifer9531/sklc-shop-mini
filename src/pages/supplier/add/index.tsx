import type { FC } from "react";
import {ScrollView, View} from "@tarojs/components";
import RegionPicker from "@/components/regionPicker";

import { AtActivityIndicator, AtButton, AtInput } from "taro-ui";
import { useEffect, useState } from "react";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { navigateToTab } from "@/utils";
import { SUPPLIER_INFO_PAGE } from "@/consts";
import Taro from "@tarojs/taro";
import './index.scss';

const AddSupplier: FC = () => {

  const [shopName, setShopName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    fetchData(page);
  }, [page]);

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

  return (
    <View>
     <RegionPicker onRegionChange={() => {}} initialValues={[0, 0, 0]} />
      <AtInput
        name='shopName'
        title='店名'
        type='text'
        placeholder='请输入店名'
        value={shopName}
        onChange={() => setShopName}
      />
      <AtButton style={{ marginTop: '20px' }} type='primary' size='small'>查询</AtButton>
      {
        data.length > 0 &&
        <View className='at-article__h3 result'>查询结果</View>
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
