import { StringSet } from './Types'
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
    this.examCount = 0
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
}
