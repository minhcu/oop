/* ES5 */
function Class(students) {
    const _students = students
    let _total = students.length

    Object.defineProperty(this, "students", {
        get: function () {
            return _students
        },
    })

    Object.defineProperty(this, "total", {
        get: function () {
            return _total
        },
    })

    Class.prototype.showStudents = function () {
        console.log(`Danh sách sinh viên:`)

        console.log(`STT | Tên | Tuổi | Title`)
        students.forEach((student, index) => {
            console.log(`${index + 1} | ${student.name} | ${student.age} | ${student.title}`)
        })

        console.log(`Tổng số sinh viên: ${this.total}`)
    }

    Class.prototype.addStudent = function (student) {
        _students.push(student)
        _total++
    }

    Class.prototype.searchStudents = function (keyword) {
        const result = this.students.filter((student) => {
            return student.name.toLowerCase().includes(keyword.toLowerCase())
        })

        console.log("Kết quả cho: " + keyword)

        console.log("STT | Tên | Tuổi | Title")
        result.forEach((student, index) => {
            console.log(`${index + 1} | ${student.name} | ${student.age} | ${student.title}`)
        })
    }

    Class.prototype = Object.freeze(Class.prototype)
}

export default Class
