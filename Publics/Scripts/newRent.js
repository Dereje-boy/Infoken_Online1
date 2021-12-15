/*
* getting access to the document
* getting data from the backend and sending back again
* sending to the frontend
* */
document.querySelector("title").innerText = "New Rent"
const studentTable = document.querySelector(".student-table");
const bookTable = document.querySelector(".book-table");
const studentName = document.querySelector(".student-name")
const bookName = document.querySelector(".book-name")
const ButtonRent = document.querySelector(".button-rent");


function Student_to_Table(student) {
    let tr = document.createElement("tr");
    let check_td = document.createElement("td");

    let firstname_td = document.createElement("td");
    let lastname_td = document.createElement("td");
    let student_td = document.createElement("td");
    let department_td = document.createElement("td");
    let dorm_td = document.createElement("td");
    let phoneNumber_td = document.createElement("td");

    const firstname = student.firstname
    const lastname = student.lastname
    const StudentID = student.studentID
    const department = student.department
    const dorm = student.dorm
    const phoneNumber = student.phoneNumber

    check_td.innerHTML = "<input type=\"radio\" name=\"select\">"
    check_td.classList.add("studentRadio")
    firstname_td.innerText = firstname;
    lastname_td.innerText = lastname;
    student_td.innerText = StudentID;
    department_td.innerText = department;
    dorm_td.innerText = dorm;
    phoneNumber_td.innerText = phoneNumber;

    tr.append(check_td,firstname_td,lastname_td,
        department_td,student_td,
        dorm_td,phoneNumber_td,)

    studentTable.children[0].append(tr);
}
function Book_to_Table(book) {
    let tr = document.createElement("tr");
    let check = document.createElement("td");


    let titel_td = document.createElement("td");
    let category = document.createElement("td");
    let quatity = document.createElement("td");
    let author = document.createElement("td");

    check.innerHTML = "<input type=\"radio\" name=\"select-book\">"
    titel_td.innerText = book.title;
    category.innerText = book.category;
    quatity.innerText = book.quantity;
    author.innerText = book.author;

    tr.append(check,titel_td,category,
        author,quatity)

    bookTable.children[0].append(tr);
}

async function fetchStudents() {
    let response = await fetch("/students/all");
    let result = await response.json();
    result.forEach(value=>{
        Student_to_Table(value);
    })
}

async function fetchBooks() {
    let response = await fetch("/books/all");
    let result = await response.json();
    result.forEach(value=>{
        Book_to_Table(value);
    })
}
fetchStudents();
fetchStudents();
fetchStudents();
fetchBooks();