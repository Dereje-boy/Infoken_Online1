async function SetupBookTable2() {
    whichTable = "books";

    //setting the existing table
    table.children[0].remove();

    // let HeadersLabel = ["Title","Category","Quantity","Author"];

    let RowHeader = document.createElement("tr");
    let tbody = document.createElement("tbody");

    //assigning the table headers label
    ["Title","Category","Quantity","Author"].forEach((value,index)=>{
        let th = document.createElement("th");
        th.innerHTML = value;
        RowHeader.append(th);
    })

    //adding the header to the table
    tbody.append(RowHeader);

    const response = await fetch("../books/all");
    const result = await response.json();

    for (const key in result) {

        let oneRow = document.createElement("tr");

        let title = document.createElement("td")
        title.innerHTML = result[key].title;

        let category = document.createElement("td")
        category.innerHTML = result[key].category;

        let quantity = document.createElement("td")
        quantity.innerHTML = result[key].quantity;

        let author = document.createElement("td")
        author.innerHTML = result[key].author;

        oneRow.append(title,category,quantity,author);

        tbody.append(oneRow);
    }

    table.append(tbody);
    setupInfo();

}
async function SetupRentTable2() {
    whichTable = "rent";

    //setting the existing table
    table.children[0].remove();

    // let HeadersLabel = ["Title","Category","Quantity","Author"];

    let RowHeader = document.createElement("tr");
    let tbody = document.createElement("tbody");

    //assigning the table headers label
    ["Firstname","Lastname","StudentID","Department"
        ,"Title","Author","Category","phone Number","Date"].forEach((value,index)=>{
        let th = document.createElement("th");
        th.innerText = value;
        RowHeader.append(th);
    })

    //adding the header to the table
    tbody.append(RowHeader);

    const response = await fetch("../rents/all");
    const result = await response.json();

    for (const key in result) {

        let oneRow = document.createElement("tr");

        let firstname = document.createElement("td")
        firstname.innerHTML = result[key].firstname;

        let lastname = document.createElement("td")
        lastname.innerHTML = result[key].lastname;

        let studentID = document.createElement("td")
        studentID.innerHTML = result[key].studentID;

        let department = document.createElement("td")
        department.innerHTML = result[key].department;

        let phoneNumber = document.createElement("td")
        phoneNumber.innerHTML = result[key].phoneNumber;

        let title = document.createElement("td")
        title.innerHTML = result[key].title;

        let author = document.createElement("td")
        author.innerHTML = result[key].author;

        let category = document.createElement("td")
        category.innerHTML = result[key].category;

        let date = document.createElement("td")
        date.innerHTML = result[key].date;

        oneRow.append(
            firstname,lastname,studentID,department,
            title,author,category,phoneNumber,date
        );

        tbody.append(oneRow);
    }

    table.append(tbody);
    setupInfo();

}

async function SetupAdminTable2() {
    whichTable = "Admins";

    //setting the existing table
    table.children[0].remove();

    let RowHeader = document.createElement("tr");
    let tbody = document.createElement("tbody");

    //assigning the table headers label
    ["Firstname","Lastname","Username","Password","Phone Number"].
        forEach((value,index)=>{
        let th = document.createElement("th");
        th.innerHTML = value;
        RowHeader.append(th);
    })

    //adding the header to the table
    tbody.append(RowHeader);

    const response = await fetch("../admin/all");
    const result = await response.json();

    for (const key in result) {

        let oneRow = document.createElement("tr");

        let firstname = document.createElement("td")
        firstname.innerHTML = result[key].firstname;

        let lastname = document.createElement("td")
        lastname.innerHTML = result[key].lastname;

        let username = document.createElement("td")
        username.innerHTML = result[key].username;

        let password = document.createElement("td")
        password.innerHTML = result[key].password;

        let phoneNumber = document.createElement("td")
        phoneNumber.innerHTML = result[key].phoneNumber;

        oneRow.append(firstname,lastname,username,password,phoneNumber);

        tbody.append(oneRow);
    }

    table.append(tbody);
    setupInfo();


}

async function SetupStudentTable2() {
    whichTable = "Students";

    //setting the existing table
    table.children[0].remove();

    let RowHeader = document.createElement("tr");
    let tbody = document.createElement("tbody");

    //assigning the table headers label
    ["Firstname","Lastname","Student ID","Department"
        ,"Gender","Dorm","Phone Number"].
        forEach((value,index)=>{
        let th = document.createElement("th");
        th.innerHTML = value;
        RowHeader.append(th);
    })

    //adding the header to the table
    tbody.append(RowHeader);

    const response = await fetch("../students/all");
    const result = await response.json();

    for (const key in result) {

        let oneRow = document.createElement("tr");

        let firstname = document.createElement("td")
        firstname.innerHTML = result[key].firstname;

        let lastname = document.createElement("td")
        lastname.innerHTML = result[key].lastname;

        let studentID = document.createElement("td")
        studentID.innerHTML = result[key].studentID;

        let department = document.createElement("td")
        department.innerHTML = result[key].department;

        let gender = document.createElement("td")
        gender.innerHTML = result[key].gender;

        let dorm = document.createElement("td")
        dorm.innerHTML = result[key].dorm;

        let phoneNumber = document.createElement("td")
        phoneNumber.innerHTML = result[key].phoneNumber;

        oneRow.append(firstname,lastname,studentID,department,gender,dorm,phoneNumber);

        tbody.append(oneRow);
    }

    table.append(tbody);

    setupInfo();

}

function setupInfo() {
    switch (whichTable.toLowerCase()) {
        case "students":
        case "student":
            //changing the Label
            infoFirstname.children[0].innerHTML = "Firstname";
            infoLastname.children[0].innerHTML = "Lastname";
            infoDepartment.children[0].innerHTML = "Student ID";
            infoStudentID.children[0].innerHTML = "Department";
            infoGender.children[0].innerHTML = "Gender";
            infoDorm.children[0].innerHTML = "Dorm";
            infoPhoneNumber.children[0].innerHTML = "Phone Number";
            break;
        case "books":
        case "book":
            //changing the Label
            infoFirstname.children[0].innerHTML = "Title";
            infoLastname.children[0].innerHTML = "Category";
            infoStudentID.children[0].innerHTML = "Quantity";
            infoDepartment.children[0].innerHTML = "Author";
            infoGender.children[0].innerHTML = "";
            infoDorm.children[0].innerHTML = "";
            infoPhoneNumber.children[0].innerHTML = "";
            break;
        case "admins":
        case "admin":
            //changing the Label
            infoFirstname.children[0].innerHTML = "Firstname";
            infoLastname.children[0].innerHTML = "Lastname";
            infoStudentID.children[0].innerHTML = "Username";
            infoDepartment.children[0].innerHTML = "Password";
            infoGender.children[0].innerHTML = "";
            infoDorm.children[0].innerHTML = "";
            infoPhoneNumber.children[0].innerHTML = "Phone Number";
            break;
        case "rents":
        case "rent":
            //changing the Label
            infoFirstname.children[0].innerHTML = "Firstname";
            infoLastname.children[0].innerHTML = "Lastname";
            infoStudentID.children[0].innerHTML = "StudentID";
            infoDepartment.children[0].innerHTML = "department";
            infoGender.children[0].innerHTML = "title";
            infoDorm.children[0].innerHTML = "Category";
            infoPhoneNumber.children[0].innerHTML = "Phone Number";
    }
    erasePreview();
}