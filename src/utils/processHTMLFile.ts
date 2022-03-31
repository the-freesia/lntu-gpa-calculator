import {
  score2Point,
  level2Point,
  GradePointConvert2Score,
} from './GradePointConverter'
import { CourseInfo } from './CourseInfo'
import SemestersAndYears from './SemestersAndYears'
import { QUALIFIED, UNQUALIFIED } from './constants'
import { CourseMap } from './Types'

export default class processHTMLFile {
  public semestersAndYears: SemestersAndYears
  private addedCourses: CourseMap
  private rawScoreData!: NodeListOf<HTMLTableRowElement>
  constructor(HTMLString: string) {
    this.processHTMLString(HTMLString)
    this.semestersAndYears = new SemestersAndYears()
    this.addedCourses = {}
    this.dataTableToArray()
  }

  /**
   * get course information
   * @return {*|{}}
   * @constructor
   */
  get Courses() {
    return this.addedCourses
  }

  getRealCourseName(textContent: string) {
    return textContent
      .replaceAll('\n', '')
      .replaceAll('\t', '')
      .replaceAll(' (补考)', '')
      .replaceAll(' (重学)', '')
      .trim()
  }

  getCleanText(text: string) {
    return text.replaceAll('\n', '').replaceAll('\t', '')
  }

  isReExamCourse(rawCourseName: string) {
    return /补考/.test(rawCourseName)
  }

  isReStudyCourse(rawCourseName: string) {
    return /重学/.test(rawCourseName)
  }

  processHTMLString(HTMLString: string) {
    const dom = new DOMParser().parseFromString(HTMLString, 'text/html')
    const dataTable = dom.querySelector('.grid table tbody')
    this.rawScoreData = (dataTable as Element).querySelectorAll('tr')
  }

  dataTableToArray() {
    this.rawScoreData.forEach((subject) => {
      let info = subject.querySelectorAll('td')
      // get state of a course
      let reExam
      if (info[3].childNodes.length > 1) {
        reExam = this.isReExamCourse(
          this.getCleanText(info[3].childNodes[1].textContent as string)
        )
      }
      // get information of a course
      let name = this.getRealCourseName(
        info[3].childNodes[0].textContent as string
      )
      let semester = this.getCleanText(info[0].textContent as string)
      let credit = parseFloat(this.getCleanText(info[5].textContent as string))
      let score
      let gradePoint
      if (info.length > 13) {
        // if one person has not passed courses, table structure is different from the others
        score = parseInt(this.getCleanText(info[12].textContent as string))
        gradePoint = score2Point(score)
        let level = undefined
        if (isNaN(score)) {
          level = this.getCleanText(info[12].textContent as string)
          gradePoint = level2Point(level)
          score = GradePointConvert2Score(gradePoint)
        }
      } else {
        // others who passed all courses
        score = parseInt(this.getCleanText(info[10].textContent as string))
        gradePoint = score2Point(score)
        let level = undefined
        if (isNaN(score)) {
          level = this.getCleanText(info[10].textContent as string)
          gradePoint = level2Point(level)
          score = GradePointConvert2Score(gradePoint)
        }
      }

      // year the exam have been taken
      let examYear = semester.slice(0, -2)
      this.semestersAndYears.addYear(examYear)
      this.semestersAndYears.addSemester(semester)

      // ensure the courses is unique
      // read information about this course for the first time
      if (this.addedCourses[name] === undefined) {
        // successfully passed
        let courseInfo = new CourseInfo(
          name,
          credit,
          score,
          gradePoint,
          semester,
          semester,
          [semester],
          [],
          QUALIFIED
        )
        courseInfo.addExamYear(examYear)

        // reExam and passed
        if (reExam && score >= 60) {
          courseInfo.incrementExamCount()
        } else if (!reExam && score < 60) {
          // you are not passed it but no reExam
          courseInfo.currentState = UNQUALIFIED
          courseInfo.passSemester = ''
        } else if (reExam && score < 60) {
          // you reExam but still not pass this course
          courseInfo.currentState = UNQUALIFIED
          courseInfo.passSemester = ''
          courseInfo.incrementExamCount()
        }
        this.addedCourses[name] = courseInfo
      } else {
        // read information about this course again
        // should add exam DATE information
        this.addedCourses[name].examSemesters.push(semester)
        this.addedCourses[name].addExamYear(examYear)
        // you passed it
        if (score >= 60) {
          this.addedCourses[name].currentState = QUALIFIED
          this.addedCourses[name].passSemester = semester
          this.addedCourses[name].gradePoint = gradePoint
        }
        // increment the exam count
        this.addedCourses[name].incrementExamCount()
        // update score
        if (score >= this.addedCourses[name].score) {
          this.addedCourses[name].score = score
        }
      }
    })
  }
}
