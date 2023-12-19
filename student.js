/* ES5 */
/*
    Function constructor
*/

function Person(name, age) {
    const _name = name
    const _age = age

    Object.defineProperty(this, "name", {
        get: function () {
            return _name
        },
    })

    Object.defineProperty(this, "age", {
        get: function () {
            return _age
        },
    })
    Student.prototype = Object.freeze(Student.prototype)
}

function Student(name, age, title) {
    const _title = title

    Person.call(this, name, age)

    Student.prototype.title = (function () {
        return _title
    })()
}

export default Student
