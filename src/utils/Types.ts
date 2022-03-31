import { CourseInfo } from './CourseInfo'

export type StringSet = {
  [key: string]: boolean
}

export type CourseMap = {
  [key: string]: CourseInfo
}

export type ClonedCourseInfo = {
  name: string
  credit: number
  score: number
  gradePoint: number
  initialSemester: string
  passSemester: string
  examSemesters: Array<string>
  examYears: Array<string>
  currentState: boolean
  examCount: number
  passedAtThisYear: (year: string) => boolean
  passedAtThisSemester: (semester: string) => boolean
}

export type ClassifiedCourses = {
  [key: string]: ClonedCourseInfo[]
}

type ReusltOfSemester = {
  semesterName: string
  gpa: number
  wam: number
}

type ResultOfYear = {
  year: string
  gpa: number
  wam: number
}

export type ResultType = {
  gpa: number
  wam: number
  byYear: Array<ResultOfYear>
  bySemester: Array<ReusltOfSemester>
}
