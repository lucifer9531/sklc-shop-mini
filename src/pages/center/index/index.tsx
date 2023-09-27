import type { FC } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtGrid, AtList, AtListItem } from "taro-ui";
import Contact from "@/components/contact";
import { navigateToTab } from "@/utils";
import { ADDRESS_PAGE, APPLY_CHECK_IN_PAGE } from "@/consts";
import './index.scss';

const Center: FC = () => {

  const gridData = [
    { value: '本月下单量' },
    { value: '总金额' },
    { value: '已付款' },
    { value: '欠款' },
  ];

  const handleGridClick = (item: object, index: number) => {
    console.log(item, index);
  }

  const logout = () => {
    Taro.showModal({
      content: '确定退出吗?',
      showCancel: true,
      cancelText: '取消',
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
    <View>
      <AtListItem onClick={() => navigateToTab(ADDRESS_PAGE)} title='收货地址' arrow='right' />
      <AtGrid onClick={handleGridClick} mode='rect' columnNum={4} data={gridData} />
      <AtList>
        <AtListItem onClick={() => navigateToTab(APPLY_CHECK_IN_PAGE)} title='申请入住' arrow='right' />
        <Contact>
          <AtListItem title='联系客服' arrow='right' />
        </Contact>
        <AtListItem onClick={logout} title='退出登录' arrow='right' />
      </AtList>
    </View>
  )
}

export default Center;
