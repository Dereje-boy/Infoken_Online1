//adding event listener to the book table
let StudentClickedRow;
let BookClickedRow;

studentTable.addEventListener("click",StudentTableClick);
function StudentTableClick(e) {
    const clickedRow = e.path[1].children;

    if (clickedRow[0].innerText === "Check") return

    //if it is radio
    if (clickedRow.length < 2){
        let newClickedRow = clickedRow[0].parentNode.parentNode

        processStudentRowRadio(clickedRow[0].parentElement.
            parentElement.childNodes)
        StudentClickedRow = clickedRow[0].parentElement.
            parentElement.childNodes;

    }else {//if it is normal td
        processStudentRow(clickedRow)
        StudentClickedRow = clickedRow
    }

}

function processStudentRow(clickedRow) {
    let firstname = clickedRow.item(1).innerText
    let lastname = clickedRow.item(2).innerText
    let radio = clickedRow.item(0)
    radio.children[0].click();
    studentName.innerHTML = firstname + " " + lastname
}
function processStudentRowRadio(clickedRow) {
    let firstname = clickedRow.item(1).innerText;
    let lastname = clickedRow.item(2).innerText;
    studentName.innerHTML = firstname + " " + lastname
}

//adding event listener to the book table
bookTable.addEventListener("click",BookTableClick);
function BookTableClick(e) {
    const clickedRow = e.path[1].children;
    if (clickedRow[0].innerText === "Check") return



    //if it is radio
    if (clickedRow.length < 2){
        processBookRowRadio(clickedRow[0].parentElement.
            parentElement.childNodes)
        BookClickedRow = clickedRow[0].parentElement.
            parentElement.childNodes;

    }else {//if it is normal td
        processBookRow(clickedRow)
        BookClickedRow = clickedRow;

    }

}

function processBookRow(clickedRow) {
    let title = clickedRow.item(1).innerText
    let radio = clickedRow.item(0)
    radio.children[0].click()
    bookName.innerHTML = title
}
function processBookRowRadio(clickedRow) {
    let title = clickedRow.item(1).innerText;
    bookName.innerHTML = title
}

ButtonRent.addEventListener('click',ButtonRentClick)
function ButtonRentClick(e) {

    if (StudentClickedRow === undefined){
        console.log("please select student first");
        return;
    }

    let firstname = StudentClickedRow[1].innerText
    let lastname = StudentClickedRow[2].innerText
    let department = StudentClickedRow[3].innerText
    let studentID = StudentClickedRow[4].innerText
    let dorm = StudentClickedRow[5].innerText
    let phoneNumber = StudentClickedRow[6].innerText

    let thisStudent = {
        firstname,lastname,studentID,department,dorm,phoneNumber
    }

    console.log(thisStudent);

    if (BookClickedRow === undefined){
        console.log("please select book first");
        return;
    }

    let title = BookClickedRow[1].innerText
    let category = BookClickedRow[2].innerText
    console.log(title + " " + category);
}