import type { FC } from "react";
import { Button, Input, Picker, Text, View, Image } from "@tarojs/components";
import Table from "@/components/table";
import Taro from "@tarojs/taro";
import { useRef, useState } from "react";
import { AtButton, AtListItem, AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import OccupyingRow from "@/components/occupyingRow";
import { useMount } from "ahooks";
import './index.scss';

const OneClickOrder: FC = () => {

  const router = Taro.useRouter();
  const inputRef = useRef();
  const [newProductName, setNewProductName] = useState<string>('');
  const [pastedText, setPastedText] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [voiceModelIsOpened, setVoiceModelIsOpened] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([
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
        res.confirm && setDataSource(prevDataSource => prevDataSource.filter(item => item.id !== id));
      }
    })
  }

  const bindInputName = (event: any, record: any) => {
    record.name = event.detail.value;
  }

  const bindInputCount = (event: any, record: any) => {
    record.count = event.detail.value;
  }

  const handleAddProduct = () => {
    if (newProductName.trim() !== '') {
      const newProduct = {
        id: dataSource.length + 1,
        number: dataSource.length + 1,
        name: newProductName,
        count: '',
      };
      setDataSource([...dataSource, newProduct]);
      setNewProductName('');
    }
  }

  const handlePastedConfirm = () => {
    if (pastedText.trim() !== '') {
      const newProduct = {
        id: dataSource.length + 1,
        number: dataSource.length + 1,
        name: pastedText,
        count: '',
      };
      setDataSource([...dataSource, newProduct]);
      setIsOpened(false);
      setPastedText('');
    }
  };

  const clearPasted = () => {
    setIsOpened(false);
    setPastedText('');
  }

  const startVoiceRecognition = async () => {
    setVoiceModelIsOpened(true);
    const { tempFilePath } = await Taro.startRecord({});
    console.log('录音文件路径:', tempFilePath);
  }

  const handleVoiceModelClose = () => {
    Taro.stopRecord();
    setVoiceModelIsOpened(false);
  }

  useMount(() => {
    const { id } = router.params;
    if (id) {
      // TODO: 从所有的供应商列表里查询当前商户
    }
  })

  return (
    <View className='page-container'>
      <Picker mode='selector' range={[]} value={0} onChange={() => {}}>
        <AtListItem title='选择供应商' arrow='right' extraText='' />
      </Picker>
      <Picker mode='time' value='' onChange={() => {}}>
        <AtListItem title='送达日期' extraText='' />
      </Picker>
	    <Picker mode='selector' range={[]} value={0} onChange={() => {}}>
		    <AtListItem title='送货地址' arrow='right' extraText='' />
	    </Picker>
      <OccupyingRow />
      <Table
        colStyle={{ padding: '0 5px' }}
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        style={{
          margin: '0 auto',
          width: '92vw',
          marginTop: '20px',
        }}
        scroll={{
          x: '100vw',
          y: 400,
        }}
      />
      <View className='operation-container'>
        <View className='order-container' onClick={startVoiceRecognition}>
          <Text className='order-text'>语音输入</Text>
        </View>
        <View className='order-container' onClick={() => setIsOpened(true)}>
          <Text className='order-text'>文本粘贴</Text>
        </View>
        {/*@ts-ignore*/}
        <View className='order-container' onClick={() => inputRef.current?.focus()}>
          <Text className='order-text'>
            增加货品
            <Input
              ref={inputRef}
              type='text'
              value={newProductName}
              onInput={(e) => setNewProductName(e.detail.value)}
              onConfirm={handleAddProduct}
            />
          </Text>
        </View>
      </View>
      <View className='btn-group'>
        <AtButton className='btn' size='normal' type='secondary'>清空</AtButton>
        <AtButton className='btn' size='normal' type='primary'>提交</AtButton>
      </View>
      <AtModal isOpened={isOpened} className='pasted-model' onClose={() => setIsOpened(false)}>
        <AtModalHeader>粘贴文本内容</AtModalHeader>
        <AtModalContent>
          {
            isOpened &&
            <Input
              className='copyValue'
              type='text'
              placeholder='粘贴'
              onInput={(e) => setPastedText(e.detail.value)}
              value={pastedText}
            />
          }
        </AtModalContent>
        <AtModalAction>
          <Button onClick={clearPasted}>清空</Button>
          <Button onClick={handlePastedConfirm}>确定</Button>
        </AtModalAction>
      </AtModal>
      <AtModal isOpened={voiceModelIsOpened} onClose={handleVoiceModelClose} className='voice-model'>
        <View className='voice-container'>
          <Image src={require('@/assets/images/wifi.png')} className='voice-icon' />
        </View>
      </AtModal>
    </View>
  )
}

export default OneClickOrder;
