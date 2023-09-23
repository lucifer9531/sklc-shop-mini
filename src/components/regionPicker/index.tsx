import type { FC } from "react";
import { getRegion } from '@/api/data';
import { Picker, View } from '@tarojs/components';
import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';
import { AtListItem } from 'taro-ui';
import { GD_KEY } from "@/consts";
import { getLocationInfo } from "@/utils";


export type TRegionObj = {
  regionValue: number[];
  regionText?: string;
  regionValObjArr: any[];
};

export type TRegionPicker = {
  onRegionChange: (e: any, obj: TRegionObj) => void;
  initialValues?: number[];
};

const RegionPicker: FC<TRegionPicker> = (props) => {
  const { onRegionChange, initialValues = [] } = props;

  const [regionAll, setRegionAll] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<any[]>([]);
  const [regionValue, setRegionValue] = useState<any[]>(initialValues);
  const [regionText, setRegionText] = useState('');
  const [regionValObjArr, setRegionValObjArr] = useState<any[]>([]);

  useAsyncEffect(async () => {
    const res = await getRegion({
      subdistrict: 3,
      key: GD_KEY,
    });
    const { province, city, district} = await getLocationInfo();
    if (res) {
      const regionAllTemp = res?.data?.districts?.[0]?.districts;
      setRegionAll(regionAllTemp);
      let range: any = [];
      let temp: any = [];
      let provinceIdx: number = -1;
      let cityIdx: number = -1;
      let districtIdx: number = -1;
      for (let i = 0; i < regionAllTemp?.length; i++) {
        temp.push(regionAllTemp?.[i]?.name);
      }
      range.push(temp);
      if (province && temp.indexOf(province) !== -1) provinceIdx = temp.indexOf(province);
      temp = [];
      for (let i = 0; i < regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.length; i++) {
        temp.push(regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.[i]?.name);
      }
      range.push(temp);
      if (city && temp.indexOf(city) !== -1) cityIdx = temp.indexOf(city);
      temp = [];
      for (let i = 0; i < regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.[cityIdx || regionValue?.[1] || 0]?.districts?.length; i++) {
        temp.push(regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.[cityIdx || regionValue?.[1] || 0]?.districts[i]?.name);
      }
      range.push(temp);
      if (district && temp.indexOf(district) !== -1) districtIdx = temp.indexOf(district);
      setRegionData(range);
      const tempObjArr = [
        {
          ...regionAllTemp?.[provinceIdx || regionValue?.[0] || 0],
          index: provinceIdx || regionValue?.[0] || 0,
        },
        {
          ...regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.[cityIdx || regionValue?.[1] || 0],
          index: cityIdx || regionValue?.[1] || 0,
        },
        {
          ...regionAllTemp?.[provinceIdx || regionValue?.[0] || 0]?.districts?.[cityIdx || regionValue?.[1] || 0]?.districts?.[districtIdx || regionValue?.[2] || 0],
          index: districtIdx || regionValue?.[2] || 0,
        },
      ];
      setRegionValue([provinceIdx, cityIdx, districtIdx]);
      setRegionValObjArr(tempObjArr);
      setRegionText(
          regionValue?.length > 0
              ? `${tempObjArr?.[0]?.name || ''} ${tempObjArr?.[1]?.name || ''} ${tempObjArr?.[2]?.name || ''}`
              : '',
      );
    }
  }, []);

  const onColumnChange = (e) => {
    let rangeTemp = regionData;
    let valueTemp = regionValue;

    let column = e.detail.column;
    let row = e.detail.value;

    valueTemp[column] = row;

    switch (column) {
      case 0:
        let cityTemp: any = [];
        let districtAndCountyTemp: any = [];
        for (let i = 0; i < regionAll?.[row]?.districts?.length; i++) {
          cityTemp.push(regionAll?.[row]?.districts?.[i]?.name);
        }
        for (let i = 0; i < regionAll?.[row]?.districts?.[0]?.districts?.length; i++) {
          districtAndCountyTemp.push(regionAll?.[row]?.districts?.[0]?.districts?.[i]?.name);
        }
        valueTemp[1] = 0;
        valueTemp[2] = 0;
        rangeTemp[1] = cityTemp;
        rangeTemp[2] = districtAndCountyTemp;
        break;
      case 1:
        let districtAndCountyTemp2: any = [];
        for (let i = 0; i < regionAll?.[valueTemp?.[0]]?.districts?.[row]?.districts?.length; i++) {
          districtAndCountyTemp2.push(regionAll?.[valueTemp?.[0]]?.districts?.[row]?.districts?.[i]?.name);
        }
        valueTemp[2] = 0;
        rangeTemp[2] = districtAndCountyTemp2;
        break;
      case 2:
        break;
    }
    setRegionData(rangeTemp);

    const tempObjArr = [
      {
        ...regionAll?.[valueTemp?.[0]],
        index: valueTemp?.[0]
      },
      {
        ...regionAll?.[valueTemp?.[0]]?.districts?.[valueTemp?.[1]],
        index: valueTemp?.[1],
      },
      {
        ...regionAll?.[valueTemp?.[0]]?.districts?.[valueTemp?.[1]]?.districts?.[valueTemp?.[2]],
        index: valueTemp?.[2],
      },
    ];

    setRegionValObjArr(tempObjArr);
    setRegionValue([...valueTemp]);
  };

  return (
      <View>
        <Picker
          mode='multiSelector'
          range={[...regionData]}
          value={regionValue}
          onChange={(e) => {
              const tempRegionText = `${regionValObjArr?.[0]?.name || ''} ${
                  regionValObjArr?.[1]?.name || ''
              } ${regionValObjArr?.[2]?.name || ''}`;
              setRegionText(tempRegionText);
              onRegionChange(e, {
                regionValue: e.detail?.value,
                regionText: tempRegionText,
                regionValObjArr,
              });
            }}
          onColumnChange={onColumnChange}
        >
          <AtListItem title='所在地' arrow='right' extraText={regionText} />
        </Picker>
      </View>
  );
};

export default RegionPicker;

