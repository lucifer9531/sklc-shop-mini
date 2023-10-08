import type { FC } from "react";
import { View, Text } from "@tarojs/components";
import { APPLY_NOTE_TEXT } from "@/consts";
import {AtButton, AtForm, AtInput, AtRadio} from "taro-ui";
import { useState } from "react";
import './index.scss';

const ApplyCheckIn: FC = () => {

  const [shopName, setShopName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  return (
    <View className='apply-container'>
      <View className='note'>
        <Text className='explain'>说明</Text>
        {
          APPLY_NOTE_TEXT.map((item: string, index: number) => (
            <Text key={index} className='content'>{item}</Text>
          ))
        }
      </View>
      <View className='space'></View>
      <AtForm>
        <AtInput
          name='shopName'
          title='店铺名称'
          type='text'
          placeholder='需与营业支招上展示一致'
          value={shopName}
          onChange={() => setShopName}
        />
        <AtInput
          name='name'
          title='法人姓名'
          type='text'
          placeholder='法人姓名'
          value={name}
          onChange={() => setName}
        />
        <AtInput
          name='phone'
          title='联系方式'
          type='text'
          placeholder='法人联系方式'
          value={phone}
          onChange={() => setPhone}
        />
        <View className='category-container'>
          <Text className='category-title'>行业类别</Text>
          <AtRadio
            options={[
              { label: '果蔬', value: 0 },
              { label: '生鲜', value: 1 },
            ]}
            value={category}
            onClick={setCategory}
          />
        </View>
      </AtForm>
      <AtButton className='submit' type='primary' size='normal'>提交</AtButton>
    </View>
  )
}

export default ApplyCheckIn;
