import type { FC } from "react";
import { Text, View } from "@tarojs/components";
import { getLocationInfo } from "@/utils";
import { useState, useEffect } from "react";
import './index.scss';

const AddSupplier: FC = () => {
  const [location, setLocation] = useState<{ province: string | null; city: string | null; district: string | null }>({
    province: null,
    city: null,
    district: null,
  });

  useEffect( () => {
    getLocation();
  }, [])

  const getLocation = async ()=> {
    try {
      const { province, city, district} = await getLocationInfo();
      setLocation({
        province: province || null,
        city: city || null,
        district: district || null,
      });
    } catch (error) {
      console.error('获取位置信息失败', error);
    }
  }

  return (
    <>
      <Text>添加供应商</Text>
      {location.province !== null && location.city !== null && location.district !== null && (
        <View>
          <Text>省：{location.province}</Text>
          <Text>市：{location.city}</Text>
          <Text>区：{location.district}</Text>
        </View>
      )}
    </>
  )
}

export default AddSupplier;
