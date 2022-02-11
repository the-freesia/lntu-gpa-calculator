export default class SemestersAndYears {
    constructor() {
        this.Years = []
        this.Semesters = []
        this.addedYears = {}
        this.addedSemesters = {}
    }

    /**
     * add unique years
     * @param {string} year
     */
    addYear(year) {
        if(!this.addedYears[year]) {
            this.Years.push(year)
            this.addedYears[year] = true;
        }
    }

    /**
     * add unique semesters
     * @param {string} semester
     */
    addSemester(semester) {
        if(!this.addedSemesters[semester]) {
            this.Semesters.push(semester)
            this.addedSemesters[semester] = true;
        }
    }
}