const express = require("express");
const router = express.Router()
const Admins_Controller = require("../Controllers/admins")
const Students_Controller = require("../Controllers/students")

// /admin
router.get("/", async (req, res) => {

    let firstname = await res.user.realFirstname;
    let lastname = await res.user.realLastname;
    let username = await res.user.realUsername;
    let students = await Students_Controller.getStudents();

    // console.log("rendering admin...")

    res.render("admin",{
        admin_username:username,
        admin_fullname:firstname+" "+lastname,
        students
    });
})

// /admin/all
router.get("/all",async (req,res)=>{

    res.json(
        await Admins_Controller.getAdmins()
    )

})

router.get("/new",(req,res)=>{
    res.render("newAdmin")
})
router.post("/new", async (req,res)=>{

    if (req.body.firstname === undefined &&
        req.body.lastname === undefined &&
        req.body.username === undefined &&
        req.body.password === undefined){

        console.log("please fill the full admin information")
        res.render("newAdmin",{message:"Please fill the full admin information"})
        return;
    }

    if (req.body.firstname.length<3 &&
        req.body.lastname.length<3 &&
        req.body.username.length<3 &&
        req.body.password.length<3){

        console.log("please fill the full admin information")
        res.render("newAdmin",{message:"Admin Information cannot be less than 3 characters"})
        return;
    }

    let admin = {}
    admin.firstname = req.body.firstname
    admin.lastname = req.body.lastname
    admin.username = req.body.username
    admin.password = req.body.password
    admin.phoneNumber = req.body.phoneNumber

    console.log(admin)

    let acknowledged = await Admins_Controller.addAdmin(admin)

    console.log(acknowledged);

    let message = admin.username.toUpperCase() + ' added successfully'
    res.render("newAdmin", {message})
})


router.post("/update", async (req, res) => {
    console.log("updating the admin")

    const admin = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        phoneNumber:req.body.phoneNumber,

        Newfirstname: req.body.Newfirstname,
        Newlastname: req.body.Newlastname,
        Newusername: req.body.Newusername,
        Newpassword: req.body.Newpassword,
        NewphoneNumber: req.body.NewphoneNumber,
    }

    console.log(admin);

    let updateResult = await Admins_Controller.updateAdmin(admin);
    console.log(updateResult)
    res.json(updateResult)

})

router.post("/delete",async (req,res)=>{
    const admin = {
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }

    const deleteResult = await Admins_Controller.deleteAdmin(admin);
    console.log(deleteResult);
    res.json(deleteResult)

})

module.exports = router;