import type { FC } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import OccupyingRow from "@/components/occupyingRow";
import OrderCard from "@/components/orderCard";
import { navigateToTab } from "@/utils";
import { ORDER_INFO_PAGE } from "@/constants";
import { useState } from "react";
import { useAsyncEffect } from "ahooks";

const MonthOrder: FC = () => {

  const [data, setData] = useState<any[]>([]);

  useAsyncEffect(async () => {
    setData([
      {
        id: 2,
        title: '牛肉商行',
        orderTime: '今天 12:00:00',
        deliveryTime: '明天 12:00:00',
        transportStatus: '待配送',
        payStatus: '已支付',
        isAlSend: false,
      }
    ])
  }, []);

  return (
    <View>
      <AtList>
        <AtListItem title='本月下单数' extraText='10次' />
        <AtListItem title='本月下单总金额' extraText='860元' />
        <AtListItem title='本月下单最多的商家' extraText='牛肉商行' />
        <AtListItem title='本月已支付金额' extraText='860元' />
        <AtListItem title='本月欠数' extraText='0元' />
      </AtList>
      <OccupyingRow />
      {
        data.map((item) => (
          <OrderCard
            id={item.id}
            key={item.id}
            orderTime={item.orderTime}
            title={item.title}
            deliveryTime={item.deliveryTime}
            money={item.money}
            transportStatus={item.transportStatus}
            payStatus={item.payStatus}
            onViewShopInfo={() => navigateToTab(`${ORDER_INFO_PAGE}?id=${item.id}`)}
          />
        ))
      }
    </View>
  )
}

export default MonthOrder;
