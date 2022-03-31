import './index.css'

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
    <div className={'resultCard'}>
      <p className={'item-title'}>
        {type}:{title}
      </p>
      <p className={'item-gpa'}>平均绩点: {gpa}</p>
      <p className={'item-wam'}>加权平均分: {wam}</p>
    </div>
  )
}

export default ResultItem
