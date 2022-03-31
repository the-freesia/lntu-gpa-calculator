import { ClonedCourseInfo, StringSet } from './Types'
export class CourseInfo {
  private addedYear: StringSet
  public examCount: number

  constructor(
    public name: string,
    public credit: number,
    public score: number,
    public gradePoint: number,
    public initialSemester: string,
    public passSemester: string,
    public examSemesters: Array<string>,
    public examYears: Array<string>,
    public currentState: boolean
  ) {
    this.addedYear = {}
    this.examCount = 1
  }

  examAtThisYear(year: string) {
    return this.examYears.includes(year)
  }

  examAtThisSemester(semester: string) {
    return this.examSemesters.includes(semester)
  }

  passedAtThisSemester(semester: string) {
    return this.passSemester === semester
  }

  passedAtThisYear(year: string) {
    return year === this.passSemester.slice(0, -2)
  }

  isPassed() {
    return this.currentState
  }

  addExamYear(year: string) {
    if (!this.addedYear[year]) {
      this.examYears.push(year)
      this.addedYear[year] = true
    }
  }

  incrementExamCount() {
    this.examCount += 1
  }

  deepCloneCourseInfo(): ClonedCourseInfo {
    let name = this.name
    let credit = this.credit
    let score = this.score
    let gradePoint = this.gradePoint
    let initialSemester = this.initialSemester
    let passSemester = this.passSemester
    let examSemesters = []
    for (const semester of this.examSemesters) {
      examSemesters.push(semester)
    }
    let examYears = []
    for (const year of this.examYears) {
      examYears.push(year)
    }
    let currentState = this.currentState
    let examCount = this.examCount

    return {
      name,
      credit,
      score,
      gradePoint,
      initialSemester,
      passSemester,
      examSemesters,
      examYears,
      currentState,
      examCount,
      passedAtThisYear: this.passedAtThisYear,
      passedAtThisSemester: this.passedAtThisSemester,
    }
  }
}
