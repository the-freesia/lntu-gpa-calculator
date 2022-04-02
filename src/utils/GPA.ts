import processHTMLFile from './processHTMLFile'
import { QUALIFIED } from './constants'
import { CourseMap, ClassifiedCourses, ResultType } from './Types'
import SemestersAndYears from './SemestersAndYears'
import { cloneDeep } from 'lodash'

export default class GradePointAverage {
  private courses: CourseMap
  public semestersAndYears: SemestersAndYears
  private coursesOfSemesters!: ClassifiedCourses
  private coursesOfYears!: ClassifiedCourses
  constructor(HTMLString: string) {
    let phf = new processHTMLFile(HTMLString)
    this.courses = phf.Courses
    console.log(this.courses)
    this.semestersAndYears = phf.semestersAndYears
    this.classifyCoursesBySemestersAndYears(this.courses)
  }

  getTotalGPA(courses: CourseMap) {
    let totalCredits = 0
    let totalCreditsMulGradePoint = 0
    for (const name in courses) {
      totalCredits += courses[name].credit
      let gradePoint = courses[name].gradePoint / courses[name].examCount
      if (gradePoint < 1) gradePoint = 1
      totalCreditsMulGradePoint += courses[name].credit * gradePoint
    }
    return totalCreditsMulGradePoint / totalCredits
  }

  getTotalWAM(courses: CourseMap) {
    let totalCredits = 0
    let totalCreditsMulScore = 0
    for (const name in courses) {
      totalCredits += courses[name].credit
      totalCreditsMulScore += courses[name].credit * courses[name].score
    }
    return totalCreditsMulScore / totalCredits
  }

  classifyCoursesBySemestersAndYears(courses: CourseMap) {
    const semesters = this.semestersAndYears.Semesters
    const years = this.semestersAndYears.Years
    this.coursesOfSemesters = {}
    this.coursesOfYears = {}

    for (const semester of semesters) {
      this.coursesOfSemesters[semester] = {}
      for (const name in courses) {
        // exam at this semester
        if (courses[name].examAtThisSemester(semester)) {
          let courseInfo = cloneDeep(courses[name])
          // if qualified and examCount greater than 2
          if (
            courseInfo.currentState === QUALIFIED &&
            courseInfo.examCount > 2
          ) {
            if (!courseInfo.passedAtThisSemester(semester)) {
              courseInfo.gradePoint = 0
            }
          }
          this.coursesOfSemesters[semester][courseInfo.name] = courseInfo
        }
      }
    }

    for (const year of years) {
      this.coursesOfYears[year] = {}
      for (const name in courses) {
        // exam at this year
        if (courses[name].examAtThisYear(year)) {
          let courseInfo = cloneDeep(courses[name])
          // if qualified and examCount greater than 2
          if (
            courseInfo.currentState === QUALIFIED &&
            courseInfo.examCount > 2
          ) {
            if (!courseInfo.passedAtThisYear(year)) {
              courseInfo.gradePoint = 0
            }
          }
          this.coursesOfYears[year][courseInfo.name] = courseInfo
        }
      }
    }
  }

  get gpaAndWAM() {
    let result: ResultType = {
      gpa: 0,
      wam: 0,
      bySemester: [],
      byYear: [],
    }
    result.byYear = []
    result.bySemester = []
    result.gpa = this.getTotalGPA(this.courses)
    result.wam = this.getTotalWAM(this.courses)
    for (const semester in this.coursesOfSemesters) {
      result.bySemester.push({
        semesterName: semester.replaceAll(' 1', ' 秋').replaceAll(' 2', ' 春'),
        gpa: this.getTotalGPA(this.coursesOfSemesters[semester]),
        wam: this.getTotalWAM(this.coursesOfSemesters[semester]),
      })
    }
    for (const year in this.coursesOfYears) {
      result.byYear.push({
        year,
        gpa: this.getTotalGPA(this.coursesOfYears[year]),
        wam: this.getTotalWAM(this.coursesOfYears[year]),
      })
    }
    return result
  }
}
