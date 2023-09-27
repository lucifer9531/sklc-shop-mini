import type { FC } from "react";
import { Block, Button, Input, View } from "@tarojs/components";
import { AtCheckbox } from "taro-ui";
import { useState } from "react";
import { getLocationInfo, navigateBack } from "@/utils";
import RegionPicker from "@/components/regionPicker";
import { useAsyncEffect } from "ahooks";
import './index.scss';

interface AddressFormState {
  id: number | string | null;
  name: string;
  tel: string;
  isDefault: boolean;
  province: string;
  city: string;
  district: string;
  addressDetail: string;
}

const initialAddressState = {
  id: null,
  addressDetail: '',
  city: '',
  district: '',
  isDefault: false,
  name: '',
  province: '',
  tel: ''
}

const AddressAdd: FC = () => {
  const [address, setAddress] = useState<AddressFormState>(initialAddressState);
  const [location, setLocation] = useState<any>([]);
  const checkboxOption = [{value: 'default', label: '设为默认地址'}];
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useAsyncEffect(async () => {
    const { province, city, district} = await getLocationInfo();
    setLocation([province, city, district]);
  }, []);

  const bindInputName = (event: any) => {
    address.name = event.detail.value;
    setAddress(address);
  }

  const bindInputMobile = (event: any) => {
    address.tel = event.detail.value;
    setAddress(address);
  }

  const bindInputAddress = (event: any) => {
    address.addressDetail = event.detail.value;
    setAddress(address);
  }

  const bindIsDefault = (value: any) => {
    address.isDefault = !address.isDefault;
    setAddress(address);
    setCheckedList(value);
  }

  const onRegionChange = (_: any, obj: any) => {
    const { regionValObjArr } = obj;
    address.province = regionValObjArr[0]?.name;
    address.city = regionValObjArr[1]?.name;
    address.district = regionValObjArr[2]?.name;
    setAddress(address);
  }

  const cancelAddress = () => {
    navigateBack();
  }

  const saveAddress = () => {
    // TODO: 执行保存操作 form表单可采用taro-ui 提交前的各种校验
    console.log(address);
  }

  return (
    <Block>
      <View className='add-address'>
        <View className='add-form'>
          <View className='form-item'>
            <Input className='input' onInput={(e) => bindInputName(e)} placeholder='姓名' value={address.name} focus />
          </View>
          <View className='form-item'>
            <Input className='input' onInput={(e) => bindInputMobile(e)} value={address.tel} placeholder='手机号码' />
          </View>
          <View>
            {
              location.length > 0 &&
              <RegionPicker onRegionChange={(_, obj) => onRegionChange(_, obj)} initialLocation={location} />
            }
          </View>
          <View className='form-item'>
            <Input className='input' onInput={(e) => bindInputAddress(e)} value={address.addressDetail} placeholder='详细地址, 如街道、楼盘号等' />
          </View>
          <View className='form-default'>
            <AtCheckbox options={checkboxOption} selectedList={checkedList} onChange={(value: any) => bindIsDefault(value)} />
          </View>
        </View>
        <View className='btns'>
          <Button className='cancel' onClick={cancelAddress}>取消</Button>
          <Button className='save' onClick={saveAddress}>保存</Button>
        </View>
      </View>
    </Block>
  )
}

export default AddressAdd;
