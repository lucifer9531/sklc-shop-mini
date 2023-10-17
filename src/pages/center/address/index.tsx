import type { FC } from "react";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import Empty from "@/components/empty";
import { AtIcon } from "taro-ui";
import { ADDRESS_ADD_PAGE } from "@/constants";
import { navigateToTab } from "@/utils";
import './index.scss';

const Address: FC = () => {

  const [addressList, setAddressList] = useState<any[]>([]);

  // TODO: 判断是添加还是编辑
  const addressAddOrUpdate = () => {
    navigateToTab(ADDRESS_ADD_PAGE);
  }

  const deleteAddress = () => {

  }

  useEffect(() => {
    setAddressList([]);
  }, [])

  return (
    <View className='container'>
      {
        addressList.length === 0 ? (
          <Empty>没有收获地址，请添加</Empty>
        ) : (
          <View className='address-list'>
            {
              addressList.map((item: any) => (
                <View className='item' key={item.id} onClick={addressAddOrUpdate} data-address-id={item.id}>
                  <View className='l'>
                    <View className='name'>{item.name}</View>
                    {
                      item.isDefault && <View className='default'>默认</View>
                    }
                  </View>
                  <View className='c'>
                    <View className='mobile'>{item.tel}</View>
                    <View className='address'>{item.addressDetail}</View>
                  </View>
                  <View className='r'>
                    <View data-address-id={item.id} onClick={deleteAddress} className='del'>
                      <AtIcon value='trash' />
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
        )
      }
      <View className='add-address' onClick={addressAddOrUpdate} data-address-id='0'>新建</View>
    </View>
  )
}

export default Address;
