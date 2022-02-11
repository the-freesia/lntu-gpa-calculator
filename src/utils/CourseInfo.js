export class CourseInfo {
    /**
     * necessary information of a course
     * @param {string} name course name
     * @param {number} credit course credit
     * @param {number} score course score
     * @param {number} gradePoint course grade point
     * @param {string} initialSemester the semester that course open
     * @param {string} passSemester the semester you passed it
     * @param {string[]} examSemesters Semesters you take exam of this course
     * @param {string[]} examYears Years you take exam of this course
     * @param {boolean} currentState current state of this course Q/F
     */
    constructor(
        name,
        credit,
        score,
        gradePoint,
        initialSemester,
        passSemester,
        examSemesters,
        examYears,
        currentState,
    )
    {
        this.name = name
        this.credit = credit
        this.score = score
        this.gradePoint = gradePoint
        this.initialSemester = initialSemester
        this.passSemester = passSemester
        this.examSemesters = examSemesters
        this.examYears = examYears
        this.currentState = currentState
        this.addedYear = {}
        this.examCount = 1
    }

    /**
     * query whether you took an exam of this course at that year or not
     * @param {string} year the year you want to query
     * @return {boolean} you took an exam of this course at that year or not
     */
    examAtThisYear(year) {
        return this.examYears.includes(year)
    }

    /**
     * query whether you took an exam of this course at that semester or not
     * @param {string} semester the semester you want to query
     * @return {boolean} you took an exam of this course at that semester or not
     */
    examAtThisSemester(semester) {
        return this.examSemesters.includes(semester)
    }

    /**
     * query whether you passed this course at that semester or not
     * @param {string} semester the semester you want to query
     * @return {boolean} you passed this course at that semester or not
     */
    passedAtThisSemester(semester) {
        return this.passSemester === semester
    }

    /**
     * query whether you passed this course at that semester or not
     * @param {string} year the semester you want to query
     * @return {boolean} you passed this course at that semester or not
     */
    passedAtThisYear(year) {
        return  year === this.passSemester.slice(0, -2)
    }

    /**
     * @return {boolean} you passed this course or not
     */
    isPassed() {
        return this.currentState
    }

    /**
     * ensure the exam years are unique
     * @param {string} year
     */
    addExamYear(year) {
        if(!this.addedYear[year]) {
            this.examYears.push(year)
            this.addedYear[year] = true
        }
    }

    incrementExamCount() {
        this.examCount += 1
    }

    /**
     * deepClone Current Course INFO
     * @return {{score: number, passSemester: string, gradePoint: number, name: string, initialSemester: number, examYears: *[], examSemesters: *[], credit: number, currentState: boolean, examCount: number}}
     */
    deepCloneCourseInfo() {
        let name = this.name
        let credit = this.credit
        let score = this.score
        let gradePoint = this.gradePoint
        let initialSemester = this.gradePoint
        let passSemester = this.passSemester
        let examSemesters = []
        for(const semester of this.examSemesters) {
            examSemesters.push(semester)
        }
        let examYears = []
        for(const year of this.examYears) {
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
            passedAtThisSemester: this.passedAtThisSemester
        }
    }
}