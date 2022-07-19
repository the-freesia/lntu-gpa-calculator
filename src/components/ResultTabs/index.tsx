import React, { useContext } from 'react'
import { Tabs } from 'antd'


import { AppContext } from '../../App'
import ResultTab from '../ResultTab'

const { TabPane } = Tabs

interface ResultTabProps {}

const ResultTabs: React.FC<ResultTabProps> = () => {
  const gpaData = useContext(AppContext)

  return (
    <div className={'mx-auto my-0'} style={{ width: '580px', minHeight: "270px" }}>
      <Tabs centered>
        <TabPane tab='总计' key={1}>
          <div className={'mx-auto text-center w-full'}>
            <div className='my-auto'>
              <h2>平均绩点: {gpaData?.gpa.toFixed(4)}</h2>
              <h2>加权平均分: {gpaData?.wam.toFixed(4)}</h2>
            </div>
          </div>
        </TabPane>
        <TabPane tab='学期' key={2}>
          <ResultTab
            tabPositon='top'
            center
            data={gpaData!.bySemester}
            type={'学期'}
          />
        </TabPane>
        <TabPane tab='学年' key={3}>
          <ResultTab
            tabPositon='top'
            data={gpaData!.byYear}
            type={'学年'}
            center
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ResultTabs
