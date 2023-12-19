import fs from "fs"
import readline from "readline"
import process from "process"
import Student from "./student.js"
import Class from "./class.js"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function App() {
    let _class
    let _dbEdited = false

    this.question = function (prompt) {
        return new Promise((resolve) => {
            rl.question(prompt, resolve)
        })
    }

    App.prototype.init = async function () {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(
                "db.txt",
                {
                    encoding: "utf-8",
                    async: true,
                },
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }
            )
        })

        const students = data
            ? data.split("\n").map((line) => {
                  const [name, age, title] = line.split(",")
                  return new Student(name, age, title)
              })
            : []
        _class = new Class(students)
    }

    App.prototype.askQuestions = async function () {
        const name = await this.question("Tên: ")

        const age = await this.question("Tuổi: ")

        const title = await this.question("Title: ")

        _class.addStudent(new Student(name, age, title))

        _dbEdited = true
    }

    App.prototype.search = async function () {
        const keyword = await this.question("Nhập từ khóa cần tìm: ")

        _class.searchStudents(keyword)
    }

    App.prototype.main = async function () {
        await this.init()
        let exit = false
        while (!exit) {
            const choice = await this.question(
                `Quản lý sinh viên
1. Nhập thông tin sinh viên
2. Hiển thị danh sách sinh viên
3. Tìm kiếm sinh viên theo tên
4. Thoát
Nhập lựa chọn của bạn: `
            )
            switch (choice) {
                case "1":
                    await this.askQuestions()
                    break
                case "2":
                    _class.showStudents()
                    break
                case "3":
                    await this.search()
                    break
                case "4":
                    exit = true
                    break
                default:
                    console.log("1 -> 4 thôi bạn ơi!")
                    break
            }
        }
        rl.on("close", async () => {
            if (!_dbEdited) {
                console.log("Bye bye!")
                return
            }
            try {
                const data = _class.students
                    .map((x) => {
                        return x.name + "," + x.age + "," + x.title + "\n"
                    })
                    .join("")
                await new Promise((resolve, reject) => {
                    fs.writeFile("db.txt", data, (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
                })
                console.log("Bye bye!")
            } catch (error) {
                console.error("Error writing to file:", error)
            }
        })
        rl.close()
    }

    App.prototype = Object.freeze(App.prototype)
}

const app = new App()

app.main()
