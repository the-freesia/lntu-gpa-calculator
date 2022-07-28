import React, { useState } from 'react'
// import ResultList from './components/ResultList'
import './index.css'
import Header from '../../components/Header'
import FileReader from '../../components/FileReader'
import Footer from '../../components/Footer'
import { ResultType } from '../../utils/Types'
import ResultTabs from '../../components/ResultTabs'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { open } from '@tauri-apps/api/shell'

export const AppContext = React.createContext<ResultType | undefined>({
    gpa: 0,
    wam: 0,
    bySemester: [],
    byYear: []
})

export function Home() {
    const navigate = useNavigate();

    const [gpaData, setGPAData] = useState<ResultType | undefined>(undefined)
    // console.log(gpaData)
    return (
        <AppContext.Provider value={gpaData}>
            <div>
                <Header />
                <div className={'readme'}>
                    <Button
                        type='link'
                        onClick={async () => {
                            try {
                                await open('https://gpahelp.xcland.tech')
                            } catch {
                                window.open('https://gpahelp.xcland.tech', '_blank');
                            }
                        }}
                    >
                        使用指北
                    </Button>
                    <Button type='link' onClick={() => { navigate('guide') }}>使用指北（Beta）</Button>
                </div>
                <FileReader setGPAData={setGPAData} />
                {/* <ResultList /> */}
                {gpaData ? <ResultTabs /> : null}
                {!gpaData ? <Footer /> : null}
            </div>
        </AppContext.Provider>
    )
}
