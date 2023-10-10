import type { FC } from "react";
import { ScrollView, View, Text } from "@tarojs/components";
import OrderCard from "@/components/orderCard";
import { useState } from "react";
import Empty from "@/components/empty";
import { AtActivityIndicator, AtButton, AtModal, AtModalContent } from "taro-ui";
import { useAsyncEffect } from "ahooks";
import Taro from "@tarojs/taro";
import {ORDER_INFO_PAGE, SEND_REMIND, SEND_REMIND_REL} from "@/consts";
import Select from "@/components/select";
import { navigateToTab } from "@/utils";
import OccupyingRow from "@/components/occupyingRow";
import './index.scss';

const Order: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<{ id?: string | number, isAlSend?: boolean }>({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{
    id: 1,
    title: '牛肉商行',
    orderTime: '今天 12:00:00',
    deliveryTime: '明天 12:00:00',
    money: 1111,
	  isAlSend: true,
    transportStatus: '待配送',
    payStatus: '待支付',
    disabled: false,
  }, {
    id: 2,
    title: '牛肉商行',
    orderTime: '今天 12:00:00',
    deliveryTime: '明天 12:00:00',
    transportStatus: '待配送',
    payStatus: '已支付',
	  isAlSend: false,
  }] as any[]);

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

  const payCallBack = (id: string | number, isAlSend: boolean) => {
    setIsOpened(true);
    setCurrentSelected({ id, isAlSend });
  }

  const sureMessage = () => {
    setIsOpened(false);
    data.map(item => item.id === currentSelected.id && (item.disabled = !item.disabled));
    setData([...data]);
  }

  useAsyncEffect(async () => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
    await fetchData(page);
  }, [page]);

  return (
    <View>
      <View className='search-container'>
        <Select options={[{ id: 1, label: 'www' }, { id: 2, label: 'ccc' }]} title='运单状态' />
        <Select options={[{ id: 1, label: 'www' }, { id: 2, label: 'ccc' }]} title='支付状态' />
        <Select options={[{ id: 1, label: 'www' }, { id: 2, label: 'ccc' }]} title='时间筛选' />
      </View>
      <OccupyingRow />
      <ScrollView
        scrollY
        onScrollToLower={handleScrollToLower}
        style={{ height: '550px' }}
      >
        {data.length === 0 ? (
          <Empty>没有订单</Empty>
        ) : (
          data.map((item) => (
            <OrderCard
              id={item.id}
              key={item.id}
              orderTime={item.orderTime}
              title={item.title}
              deliveryTime={item.deliveryTime}
              money={item.money}
              transportStatus={item.transportStatus}
              payStatus={item.payStatus}
              disabled={item.disabled}
              onViewShopInfo={() => navigateToTab(`${ORDER_INFO_PAGE}?id=${item.id}`)}
              payCallBack={() => payCallBack(item.id, item.isAlSend)}
            />
          ))
        )}
        {loading && <AtActivityIndicator content='加载中...' />}
      </ScrollView>
      <AtModal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <AtModalContent>
          <Text className='modal-content'>{ currentSelected.isAlSend ? SEND_REMIND_REL : SEND_REMIND }</Text>
          <AtButton type='primary' size='small' onClick={sureMessage}>确定</AtButton>
        </AtModalContent>
      </AtModal>
    </View>
  )
}

export default Order;
