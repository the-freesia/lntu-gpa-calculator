import React, { useState } from 'react'
// import ResultList from './components/ResultList'
import './App.css'
import Header from './components/Header'
import FileReader from './components/FileReader'
import Footer from './components/Footer'
import { ResultType } from './utils/Types'
import ResultTabs from './components/ResultTabs'
import { Button } from 'antd'

export const AppContext = React.createContext<ResultType | undefined>({
  gpa: 0,
  wam: 0,
  bySemester: [],
  byYear: []
})

function App () {
  const [gpaData, setGPAData] = useState<ResultType | undefined>(undefined)
  // console.log(gpaData)
  return (
    <AppContext.Provider value={gpaData}>
      <div>
        <Header />
        <div className={'readme'}>
          <Button type='link' href='https://gpahelp.xcland.tech/'>使用指北</Button>
        </div>
        <FileReader setGPAData={setGPAData} />
        {/* <ResultList /> */}
        {gpaData ? <ResultTabs /> : null}
        {!gpaData ? <Footer /> : null}
      </div>
    </AppContext.Provider>
  )
}

export default App
