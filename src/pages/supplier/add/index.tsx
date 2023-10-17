import type { FC } from "react";
import { ScrollView, View } from "@tarojs/components";
import RegionPicker from "@/components/regionPicker";

import { AtActivityIndicator, AtButton, AtDivider, AtInput } from "taro-ui";
import { useState } from "react";
import Empty from "@/components/empty";
import SupplierCard from "@/components/supplierCard";
import { getLocationInfo, navigateToTab } from "@/utils";
import { SUPPLIER_INFO_PAGE } from "@/constants";
import Taro from "@tarojs/taro";
import { useAsyncEffect } from "ahooks";
import OccupyingRow from "@/components/occupyingRow";
import { bindSupplier, getSupplier } from "@/api/supplier";
import useDict from "@/hooks/useDict";
import './index.scss';

const AddSupplier: FC = () => {

  const [supplierName, setSupplierName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as any[]);
  const [supplierCount, setSupplierCount] = useState<number>(0);
  const [address, setAddress] = useState<any>([]);
  const { getValue } = useDict('SUPPLIER_TYPE');

  useAsyncEffect(async () => {
    const { province, city, district} = await getLocationInfo();
    setAddress([province, city, district]);
  }, []);

  const regionChange = (_, obj) => {
    const { regionValObjArr } = obj;
    setAddress([regionValObjArr[0]?.name, regionValObjArr[1]?.name, regionValObjArr[2]?.name]);
  }

  const addSupplier = (id: string) => {
    bindSupplier({ supplierId: id }).then(() => {
      Taro.eventCenter.trigger('dataAdded');
    })
  }

  const searchSupplier = async (pageNo: number) => {
    try {
      setLoading(true);
      const { data: { data: { records, total }}} = await getSupplier({ pageNo, pageSize: 5, supplierName, province: address[0], city: address[1] });
      setSupplierCount(total);
      setData((prevData) => [...prevData, ...records]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useAsyncEffect(async () => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    page > 1 && await searchSupplier(page);
  }, [page]);

  const handleScrollToLower = () => {
    if (!loading && data.length < supplierCount) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  return (
    <View>
      {
        address.length > 0 &&
        <RegionPicker onRegionChange={regionChange} initialLocation={address} />
      }
      <AtInput
        name='shopName'
        title='店名'
        type='text'
        placeholder='店铺名称'
        value={supplierName}
        onChange={(value: string) => setSupplierName(value)}
      />
      <AtButton className='search-btn' type='primary' size='normal' onClick={() => searchSupplier(page)}>查询</AtButton>
      {
        data.length > 0 &&
        <>
          <OccupyingRow />
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
              shopName={`${item.address}${item.supplierName}`}
              title={item.supplierName}
              lastOrderTime={item.lastOrderTime}
              phoneNumber={item.phone}
              tag={getValue(item.type)}
              addSupplier={() => {addSupplier(item.id)}}
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
    </View>
  )
}

export default AddSupplier;
