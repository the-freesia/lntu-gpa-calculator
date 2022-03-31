import React, { useState } from 'react'
import ResultList from './components/ResultList'
import './App.css'
import Header from './components/Header'
import FileReader from './components/FileReader'
import Footer from './components/Footer'
import { ResultType } from './utils/Types'

export const AppContext = React.createContext<ResultType>({
  gpa: 0,
  wam: 0,
  bySemester: [],
  byYear: [],
})

function App() {
  const [gpaData, setGPAData] = useState<ResultType>({
    gpa: 0,
    wam: 0,
    bySemester: [],
    byYear: [],
  })
  // console.log(gpaData)
  return (
    <AppContext.Provider value={gpaData}>
      <div>
        <Header />
        <p className={'readme'}>
          <a href="https://gpahelp.xcland.tech/">使用指北</a>
        </p>
        <FileReader setGPAData={setGPAData} />
        <ResultList />
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
