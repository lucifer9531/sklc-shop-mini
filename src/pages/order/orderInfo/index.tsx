import type { FC } from 'react';
import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { useMount } from "ahooks";
import { useState } from "react";
import Table from "@/components/table";
import { AtButton } from "taro-ui";
import OccupyingRow from "@/components/occupyingRow";
import './index.scss';

const OrderInfo: FC = () => {

  const router = Taro.useRouter();
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
      width: 50,
    },
    {
      title: '品名',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'count',
      width: 60,
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (t) => '￥' + t,
      width: 70,
    },
    {
      title: '总计',
      dataIndex: 'sum',
      width: 70,
    },
  ]

  useMount(() => {
    const { id} = router.params;
    if (id) {
       // TODO: 获取订单的详情
      console.log(id);
      setOrderInfo({
        status: '待标价',
        shopName: '牛肉商行',
        time: '2023-12-12 17:00'
      });
      setDataSource([
        {
          id: 1,
          number: '1',
          name: '黄瓜',
          count: '12斤',
          price: 5,
          sum: '未标价',
        },
        {
          id: 2,
          number: '2',
          name: '西红柿',
          count: '9斤',
          price: 5,
          sum: '未标价',
        },
        {
          id: 3,
          number: '3',
          name: '西红柿',
          count: '91斤',
          price: 5,
          sum: '未标价',
        },
        {
          id: 4,
          number: '4',
          name: '西红柿',
          count: '19斤',
          price: 9,
          sum: '未标价',
        },
      ])
    }
  })

  return (
    <View className='order-info-container'>
      <View className='header-container'>
        <View className='content'>
          <Text>向：{orderInfo?.shopName}下单</Text>
          <Text>于：{orderInfo?.time}前送达</Text>
        </View>
        <Text className='status'>{ orderInfo?.status }</Text>
      </View>
      <OccupyingRow />
      <Text className='title'>订单明细</Text>
      <Table
        colStyle={{ padding: '0 5px' }}
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        style={{
          margin: '0 auto',
          width: '92vw',
        }}
        scroll={{
          x: '100vw',
          y: 400,
        }}
      />
      <View className='statistics-container'>
        <Text>预计总计</Text>
        <Text>1000￥</Text>
      </View>
      <View className='total-container'>
        <Text>货品种类：n个</Text>
        <Text>(预计)总金额：1000元</Text>
      </View>
      <View className='bottom-container'>
        <View className='phone-container'>
          <Image src={require('@/assets/images/call.png')} className='phone-icon' />
        </View>
        <AtButton className='btn' type='primary' size='normal'>撤回</AtButton>
        <AtButton className='btn' type='primary' size='normal'>我已支付</AtButton>
      </View>
    </View>

  )
}

export default OrderInfo;
