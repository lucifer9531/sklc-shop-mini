import type { FC } from "react";
import { Button } from '@tarojs/components'
import './contact.scss';


const Contact: FC = (props: any) => {
  return (
    <Button className='user_column_item_phone' openType='contact'>
      {props.children}
    </Button>
  )
}

export default Contact;
