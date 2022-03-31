import { StringSet } from './Types'

export default class SemestersAndYears {
  public Years: Array<string>
  public Semesters: Array<string>
  private addedYears: StringSet
  private addedSemesters: StringSet
  constructor() {
    this.Years = []
    this.Semesters = []
    this.addedYears = {}
    this.addedSemesters = {}
  }

  addYear(year: string) {
    if (!this.addedYears[year]) {
      this.Years.push(year)
      this.addedYears[year] = true
    }
  }

  addSemester(semester: string) {
    if (!this.addedSemesters[semester]) {
      this.Semesters.push(semester)
      this.addedSemesters[semester] = true
    }
  }
}
