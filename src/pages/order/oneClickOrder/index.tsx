import type { FC } from "react";
import {Button, Input, Text, View} from "@tarojs/components";
import Table from "@/components/table";
import Taro from "@tarojs/taro";
import { useState } from "react";
import {AtButton, AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import './index.scss';

const OneClickOrder: FC = () => {

  let [dataSource, setDataSource] = useState<any[]>([
    {
      id: 1,
      number: '1',
      name: '黄瓜',
      count: '12斤',
    },
    {
      id: 2,
      number: '2',
      name: '黄瓜',
      count: '12斤',
    },
    {
      id: 3,
      number: '3',
      name: '黄瓜',
      count: '12斤',
    },
  ]);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  let [copyValue, setCopyValue] = useState<string>('');

  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
      width: 50,
    },
    {
      title: '品名',
      dataIndex: 'name',
      render: (t, record) => {
        return <Input onInput={(e) => bindInputName(e, record)} value={t} />
      },
    },
    {
      title: '数量',
      dataIndex: 'count',
      render: (t, record) => {
        return <Input onInput={(e) => bindInputCount(e, record)} value={t} />
      },
    },
    {
      title: '操作',
      dataIndex: 'number',
      render: (_, record) => {
        return (
          <Button type='warn' size='mini' onClick={() => toDel(record.id)}>删除</Button>
        );
      },
    },
  ];

  const toDel = (id: number) => {
    Taro.showModal({
      content: '确定删除吗?',
      showCancel: true,
      confirmText: '确定',
      confirmColor: '#1EC263',
      success(res) {
        if (res.confirm) {
          dataSource = dataSource.filter(item => item.id !== id);
          setDataSource(dataSource);
        }
      }
    })
  }

  const bindInputName = (event: any, record: any) => {
    record.name = event.detail.value;
  }

  const bindInputCount = (event: any, record: any) => {
    record.count = event.detail.value;
  }

  const bindCopyValue = (event: any) => {
    copyValue = event.detail.value;
    setCopyValue(event.detail.value);
  }

  const addValue = () => {
    dataSource.push({ id: dataSource.length + 1, number: dataSource.length + 1, name: copyValue, count: '' });
    setDataSource(dataSource);
    setIsOpened(false);
  }

  const clearValue = () => {
    copyValue = '';
    setCopyValue(copyValue);
    setIsOpened(false);
  }

  return (
    <View className='page-container'>
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
      <View className='operation-container'>
        <View className='order-container'>
          <Text className='order-text'>语音输入</Text>
        </View>
        <View className='order-container' onClick={() => setIsOpened(true)}>
          <Text className='order-text'>文本粘贴</Text>
        </View>
        <View className='order-container'>
          <Text className='order-text'>增加货品</Text>
        </View>
      </View>
      <View className='btn-group'>
        <AtButton className='btn' size='normal' type='secondary'>清空</AtButton>
        <AtButton className='btn' size='normal' type='primary'>提交</AtButton>
      </View>
      <AtModal isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <AtModalHeader>粘贴文本内容</AtModalHeader>
        <AtModalContent>
          <Input className='copyValue' onInput={(e) => bindCopyValue(e)} placeholder='粘贴' value={copyValue} />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={clearValue}>清空</Button>
          <Button onClick={addValue}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

export default OneClickOrder;
