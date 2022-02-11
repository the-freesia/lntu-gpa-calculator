import {useContext} from "react";
import {AppContext} from "../../App";
import ResultItem from "../ResultItem";
import "./index.css"


const ResultList = (props) => {
  const { gpaData } = useContext(AppContext)
  // console.log("Result List",gpaData)
  return <>
    <div className={"listContainer"}>
      {gpaData.gpa !== 0 ? <ResultItem type={"总计"} gpa={gpaData.gpa.toFixed(4)} wam={gpaData.wam.toFixed(4)}/> : ""}
    </div>
    <div className={"listContainer"}>

      {gpaData.byYear !== undefined ? gpaData.byYear.map(year => {
        return <ResultItem key={year.gpa} type={"学年"} title={year.year} gpa={year.gpa.toFixed(4)} wam={year.wam.toFixed(4)}/>
      }) : ""}
    </div>
    <div className={"listContainer"}>

      {gpaData.bySemester !== undefined ? gpaData.bySemester.map(semester => {
        return <ResultItem key={semester.gpa} type={"学期"} title={semester.semesterName} gpa={semester.gpa.toFixed(4)} wam={semester.wam.toFixed(4)}/>
      }) : ""}
    </div>
  </>
}

export default ResultList
