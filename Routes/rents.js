const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Rents_Controller = require("../Controllers/rents")


// /rents
router.get("/", (req, res) => {
    let userEmail = res.user.realFirstname;
    res.send("welcome to rents..\n" + userEmail)
})

router.get('/all', (req, res) => {
    // res.send("fetching all students")
    // Students_Controller.getStudents(val => {
    //     console.log(val)
    //     res.send(val);
    // })

    Rents_Controller.getRents().then(value => {
        // var json = JSON.parse(value.toString());
        if (value.length == 0)
            res.json("<h1>Rent not found</h1>")
        else res.json(value)
    })
})

router.get("/allJSON", async (req, res) => {

    let allStudents = await Students_Controller.getStudents();

    // return allStudents;

    let json = {name: "giegjie"};

    let myjson = {
        "name": "Dere Boy",
        "age": 90,
        "sex": "Female"
    }

    res.json(allStudents);

})

router.get('/new', (req, res) => {
    res.render("newRent",
        {
            admin_username: res.user.realStudentsID,
            admin_fullname: res.user.realFirstname + " " + res.user.realLastname,
        }
    );

})

router.get("/added", (req, res) => {
    // res.redirect("/login");
    res.redirect("/students/new")
});

router.post("/added", async (req, res) => {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let studentID = req.body.studentID;
    let department = req.body.department;
    let dorm = req.body.dorm;
    let phoneNumber = req.body.phoneNumber;


    let title = req.body.title
    let category = req.body.category
    let author = req.body.author
    let date = req.body.date

    let registrarID = res.user.real_id;

    if (!(firstname && lastname &&
        studentID && department && dorm)) {
        console.log("data is not fill out...")
        res.render("newRent", {firstname: "please fill all the fields"})
        return
    }

    Rents_Controller.addRent({
        firstname,
        lastname,
        studentID,
        department,
        dorm,
        phoneNumber,
        registrarID,
        title, category, author, date: Date.now()
    })

    res.render("newRent",
        {firstname: `${title} is rented to ${firstname} successfully`})
})

router.post("/delete", async (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    if (firstname !== undefined && lastname !== undefined) {
        let deleteResult = await Students_Controller.deleteStudent({firstname, lastname})
        // console.log("firstname : "+firstname)
        // console.log("lastname : "+lastname)
        // console.log(deleteResult.deletedCount);
        // console.log(deleteResult.acknowledged);
        res.send(deleteResult)
        return;
    }
})

router.post("/update", async (req, res) => {
    console.log("updating the student")
    const student = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        studentID: req.body.studentID,
        department: req.body.department,
        gender: req.body.gender,
        dorm: req.body.dorm,

        newFirstname: req.body.newFirstname,
        newLastname: req.body.newLastname,
        newStudentID: req.body.newStudentID,
        newDepartment: req.body.newDepartment,
        newGender: req.body.newGender,
        newDorm: req.body.newDorm,
    }

    console.log(student);

    let updateResult = await Students_Controller.updateStudent(student);
    console.log(updateResult)
    res.json(updateResult)

})

module.exports = router;