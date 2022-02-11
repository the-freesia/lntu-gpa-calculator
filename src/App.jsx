import React, {useState} from "react";
import ResultList from "./components/ResultList";
import "./App.css"
import Header from "./components/Header";
import FileReader from "./components/FileReader";
import Footer from "./components/Footer";
export const AppContext = React.createContext({})

function App() {
  const [gpaData, setGPAData] = useState({
      gpa: 0,
      wam: 0,
      bySemester: [],
      byYear: []
    })
  // console.log(gpaData)
  return <AppContext.Provider value={{gpaData, setGPAData}}>
    <Header/>
    <p className={"readme"}><a href="https://gpahelp.xcland.tech/">使用指北</a></p>
    <FileReader/>
    <ResultList/>
    <Footer/>
  </AppContext.Provider>
}

export default App;
