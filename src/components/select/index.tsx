import type { FC } from 'react';
import { useState } from 'react';
import { View, Image } from '@tarojs/components';
import { useMount } from "ahooks";
import './index.scss';

interface SelectProps {
  initialValue?: string | number;
  options: any[];
  onSelected?: (id: string | number) => void;
  title?: string;
}

const Select: FC<SelectProps> = ({ options, initialValue, onSelected, title }) => {
  const [selectShow, setSelectShow] = useState(false);
  const [nowText, setNowText] = useState<string | undefined>('请选择');
  const [num, setNum] = useState<string | number>('');
  const [arrowRotation, setArrowRotation] = useState(0);

  useMount(() => {
    initSelect();
  });

  const initSelect = () => {
    if (initialValue) {
      const nowTextValue = options.find(obj => obj.id === initialValue)?.label || '';
      setNowText(nowTextValue);
      setNum(initialValue);
    } else {
      title && setNowText(title);
    }
  };

  const selectToggle = () => {
    const nowShow = selectShow;
    const newRotation = nowShow ? 0 : 180;
    setArrowRotation(newRotation);
    setSelectShow(!nowShow);
  };

  const setText = (e: any) => {
    const nowIdx = e.target.dataset.id;
    const nowTextValue = options.find(obj => obj.id === nowIdx).label;
    setArrowRotation(0);
    setSelectShow(false);
    setNowText(nowTextValue);
    setNum(nowIdx);
    onSelected && onSelected(e.target.dataset.id);
  };

  return (
    <View className='com-selectBox'>
      <View className='com-sContent' onClick={selectToggle}>
        <View className='com-sTxt'>{nowText}</View>
        <Image
          src={require('@/assets/images/union1.png')}
          className='com-sImg'
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        />
      </View>
      {selectShow && (
        <View className='com-sList'>
          {options.map(item => (
            <View
              key={item.id}
              data-id={item.id}
              className={`com-sItem ${num === item.id ? 'cur' : ''}`}
              onClick={setText}
            >
              {item.label}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default Select;
