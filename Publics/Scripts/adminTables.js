
const bookTable = document.querySelector(".book-table");
const adminTable = document.querySelector(".admin-table");
const rentTable = document.querySelector(".rent-table");

const infoFirstname = document.querySelector(".firstname");
const infoLastname = document.querySelector(".lastname");
const infoStudentID = document.querySelector(".studentID");
const infoDepartment = document.querySelector(".department");
const infoGender = document.querySelector(".gender");
const infoDorm = document.querySelector(".dorm");
const infoPhoneNumber = document.querySelector(".phoneNumber");


bookTable.addEventListener("click", (e) => {
    bookTableEventListener(e)
});
adminTable.addEventListener("click", (e) => {
    AdminTableEventListener(e)
});
