import './index.css'
import { Card } from 'antd'

interface RIprops {
  type: string
  title?: string
  gpa: string
  wam: string
}

const ResultItem: React.FC<RIprops> = (props) => {
  // console.log(props);
  const { type, title, gpa, wam } = props
  return (
    <Card title={`${type}:${title}`} className={'resultCard'}>
      {/* <p className={'item-title'}>
        {type}:{title}
      </p> */}
      <p className={'item-gpa'}>平均绩点: {gpa}</p>
      <p className={'item-wam'}>加权平均分: {wam}</p>
    </Card>
  )
}

export default ResultItem
