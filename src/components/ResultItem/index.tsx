import './index.css'
import { Card } from 'antd'

interface RIprops {
  type: string
  title?: string
  gpa: string
  wam: string
}

const ResultItem: React.FC<RIprops> = props => {
  // console.log(props);
  const { type, title, gpa, wam } = props
  return (
    <div className={'resultCard m-2'}>
      <Card title={`${type}:${title}`}>
        <p className={'item-gpa'}>平均绩点: {gpa}</p>
        <p className={'item-wam'}>加权平均分: {wam}</p>
      </Card>
    </div>
  )
}

export default ResultItem
