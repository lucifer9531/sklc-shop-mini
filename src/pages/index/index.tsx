import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import './index.scss';

const ButtonExample = () => (
  <WingBlank>
    <Button>default</Button><WhiteSpace />
    <Button disabled>default disabled</Button><WhiteSpace />

    <Button type='primary'>primary</Button><WhiteSpace />
    <Button type='primary' disabled>primary disabled</Button><WhiteSpace />

    <Button type='warning'>warning</Button><WhiteSpace />
    <Button type='warning' disabled>warning disabled</Button><WhiteSpace />
    <WhiteSpace />

    <WhiteSpace />
    <Button type='primary' inline style={{ marginRight: '4px' }}>inline primary</Button>
    <Button type='ghost' inline style={{ marginRight: '4px' }} className='am-button-borderfix'>inline ghost</Button>

    <WhiteSpace />
    <Button type='primary' inline size='small' style={{ marginRight: '4px' }}>primary</Button>
    <Button type='primary' inline size='small' disabled>primary disabled</Button>
    <WhiteSpace />
    <Button type='ghost' inline size='small' style={{ marginRight: '4px' }}>ghost</Button>
    <Button type='ghost' inline size='small' className='am-button-borderfix' disabled>ghost disabled</Button>
  </WingBlank>
)

export default function Index () {
  return (
    <>
      <ButtonExample />
    </>
  )
}

