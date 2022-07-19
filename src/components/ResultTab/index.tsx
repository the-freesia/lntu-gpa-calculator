import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs

interface ResultTabProps {
  data: Array<Record<string, any>>
  type: '学年' | '学期'
  tabPositon?: 'top' | 'left'
  center?: boolean
}

const ResultTab: React.FC<ResultTabProps> = ({
  data,
  type,
  tabPositon,
  center
}) => {
  return (
    <div style={{ maxHeight: '250px' }}>
      <Tabs
        tabPosition={tabPositon ?? 'left'}
        centered={center}
        style={{ height: 200 }}
      >
        {data.map(result => {
          return (
            <TabPane
              tab={result['year'] ?? result['semesterName']}
              key={result['wam']}
            >
              {/* <ResultItem type={type} gpa={result['gpa'].toFixed(4)} wam={result['wam'].toFixed(4)}/> */}
              <div
                className={'mx-auto text-center w-full'}
                style={{
                  height: '200px'
                }}
              >
                <div
                  className='my-auto'
                  style={{
                    marginTop: '50px',
                    marginBottom: '20px'
                  }}
                >
                  <h2>平均绩点: {result['gpa'].toFixed(4)}</h2>
                  <h2>加权平均分: {result['wam'].toFixed(4)}</h2>
                </div>
              </div>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

export default ResultTab
