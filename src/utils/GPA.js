import processHTMLFile from "./processHTMLFile";
import {QUALIFIED} from "./constants";

export default class GradePointAverage {
    constructor(HTMLString) {
        let phf = new processHTMLFile(HTMLString)
        this.courses = phf.Courses
        this.semestersAndYears = phf.semestersAndYears
        this.classifyCoursesBySemestersAndYears(this.courses)
    }

    /**
     * calculate the total gpa of one person
     * @param {processHTMLFile} courses
     * @return {number}
     */
    getTotalGPA(courses) {
        let totalCredits = 0
        let totalCreditsMulGradePoint = 0
        for(const name in courses) {
            totalCredits += courses[name].credit
            let gradePoint = courses[name].gradePoint / courses[name].examCount
            if(gradePoint < 1) gradePoint = 1
            totalCreditsMulGradePoint += courses[name].credit * gradePoint
        }
        return totalCreditsMulGradePoint / totalCredits
    }

    /**
     * calculate the total wam of one person
     * @param {processHTMLFile.Courses} courses
     * @return {number}
     */
    getTotalWAM(courses) {
        let totalCredits = 0
        let totalCreditsMulScore = 0
        for(const name in courses) {
            totalCredits += courses[name].credit
            totalCreditsMulScore += courses[name].credit * courses[name].score
        }
        return totalCreditsMulScore / totalCredits
    }

    /**
     * classify courses by Semesters And Years
     * @param {processHTMLFile.Courses} courses
     */
    classifyCoursesBySemestersAndYears(courses) {
        const semesters = this.semestersAndYears.Semesters
        const years = this.semestersAndYears.Years
        this.coursesOfSemesters = {}
        this.coursesOfYears = {}

        for(const semester of semesters) {
            this.coursesOfSemesters[semester] = []
            for(const name in courses) {
                // exam at this semester
                if(courses[name].examAtThisSemester(semester)) {
                    let courseInfo = courses[name].deepCloneCourseInfo()
                    // if qualified and examCount greater than 2
                    if(courseInfo.currentState === QUALIFIED && courseInfo.examCount > 2) {
                        if(!courseInfo.passedAtThisSemester(semester)) {
                            courseInfo.gradePoint = 0
                        }
                    }
                    this.coursesOfSemesters[semester].push(courseInfo)
                }
            }
        }

        for(const year of years) {
            this.coursesOfYears[year] = []
            for(const name in courses) {
                // exam at this year
                if(courses[name].examAtThisYear(year)) {
                    let courseInfo = courses[name].deepCloneCourseInfo()
                    // if qualified and examCount greater than 2
                    if(courseInfo.currentState === QUALIFIED && courseInfo.examCount > 2) {
                        if(!courseInfo.passedAtThisYear(year)) {
                            courseInfo.gradePoint = 0
                        }
                    }
                    this.coursesOfYears[year].push(courseInfo)
                }
            }
        }
    }



    get gpaAndWAM() {
        let result = {}
        result.byYear = []
        result.bySemester = []
        result.gpa = this.getTotalGPA(this.courses)
        result.wam = this.getTotalWAM(this.courses)
        for (const semester in this.coursesOfSemesters) {
            result.bySemester.push({
                semesterName: semester.replaceAll(' 1', ' 秋').replaceAll(' 2', ' 春'),
                gpa: this.getTotalGPA(this.coursesOfSemesters[semester]),
                wam: this.getTotalWAM(this.coursesOfSemesters[semester])
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