import type { FC } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem } from "taro-ui";
import Contact from "@/components/contact";
import { navigateToTab } from "@/utils";
import { useState } from "react";
import { ADDRESS_PAGE, APPLY_CHECK_IN_PAGE, MONTH_ORDER_PAGE } from "@/consts";
import OccupyingRow from "@/components/occupyingRow";
import { useMount } from "ahooks";
import PhoneNumber from "@/components/phoneNumber";
import './index.scss';

const Center: FC = () => {
  const router = Taro.useRouter();
  const statisticsData = ['本月下单量', '总金额', '已付款', '欠款'];
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useMount(() => {
    setIsLogin(Boolean(router.params.isLogin));
    Taro.setTabBarBadge({
      index: 1,
      text: '0',
    })
  })

  const handleClick = (item: string) => {
    switch (item) {
      case statisticsData[0]:
        navigateToTab(MONTH_ORDER_PAGE);
        break;
      default:
        break;
    }
  }

  const getPhoneNumber = (e: any) => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // TODO: 调用后台接口登录
      console.log(e.detail);
    } else {
      console.log('用户拒绝授权获取手机号');
    }
  }

  const logout = () => {
      Taro.showModal({
        content: '确定退出吗?',
        showCancel: true,
        cancelColor: '#7f7f7f',
        confirmText: '确定',
        confirmColor: '#2d8cf0',
        success(res) {
          if (res.confirm) {
            Taro.setStorageSync('Authorization', '');
            Taro.setStorageSync('userInfo', null);
            // TODO: 返回到登录页
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
  }

  return (
    <View className='center-container'>
      <View className='avatar-container'>
        <AtAvatar className='avatar' circle image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'></AtAvatar>
        {
          isLogin ? (
            <>
              <Text className='nick-name'>Lucifer</Text>
              <Image src={require('@/assets/images/edit.png')} className='edit-icon' />
            </>
          ) : (
            <PhoneNumber onGetPhoneNumber={getPhoneNumber}>
              <Text className='nick-name'>未登录</Text>
            </PhoneNumber>
          )
        }
      </View>
      <OccupyingRow />
      <View className='title'>信息模块</View>
      <View className='basic-card'>
        <AtListItem onClick={() => navigateToTab(ADDRESS_PAGE)} title='收货地址' arrow='right' />
      </View>
      <View className='title'>数据统计</View>
      <View className='basic-card'>
        <AtList>
          {
            statisticsData.map((item, index) => (
              <AtListItem key={index} onClick={() => handleClick(item)} title={item} arrow='right' />
            ))
          }
        </AtList>
      </View>
      <View className='basic-card'>
        <AtList>
          <AtListItem className='check-in' onClick={() => navigateToTab(APPLY_CHECK_IN_PAGE)} title='申请入驻' arrow='right' />
          <Contact>
            <AtListItem title='联系客服' arrow='right' />
          </Contact>
          <AtListItem onClick={logout} title='退出登录' arrow='right' />
        </AtList>
      </View>
    </View>
  )
}

export default Center;
