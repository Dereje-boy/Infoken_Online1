const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const db_name = "Infoken";
const collection = 'Students';

function addStudent(student) {
    mongoClient.connect(url, (error, db) => {
        if (error) {
            console.log("unable to connect to the database.")
            throw new Error("unable to connect.")
        }
        let database = db.db(db_name)
        database.collection(collection).insertOne({
            firstname: student.firstname,
            lastname: student.lastname,
            studentID: student.studentID,
            department: student.department,
            gender: student.gender,
            dorm: student.dorm,
            phoneNumber: student.phoneNumber,
            registrarID: student.registrarID,
            Date: student.date
        }, (error, result) => {
            if (error) {
                console.log("unable to add " + student.firstname + " " + student.lastname);
                throw new Error("student not added")
            }
            console.log("the student is added : " + student.firstname + " " + student.lastname);
            return true;
        });
    })
}

async function getStudents() {
    let mongo;
    try {
        mongo = await mongoClient.connect(url);
    } catch (e) {
        if (e.name.toString() === "MongoServerSelectionError"){
            console.log("Server Selection Error")
        }
        console.log("unable to retrieve students \n" + e.name)
        return undefined;
    }
    const database = mongo.db(db_name);
    const cursor = database.collection(collection).find();

    let hasnext = await cursor.hasNext();

    let values = []

    while (hasnext) {
        let value = await cursor.next();
        values.push(value)
        hasnext = await cursor.hasNext();
    }

    //     mongoClient.connect(url,(err,db)=>{
    //     if (err) throw new Error("getStudents : unable to connect to database")
    //     const database = db.db(db_name);
    //     // const dataCount = database.collection(collection).findOne({firstname:"Hawi"})
    //     //     .then(value => {
    //     //         console.log(value)
    //     //     })
    //     const cursor = database.collection(collection).find();
    //
    //     let next = await cursor.hasNext();
    //
    //
    //     cursor.hasNext().then(value => {
    //         if (value)
    //             cursor.next().then(value=>{
    //                 console.log(value)
    //                 cursor.hasNext().then(value => {
    //                     if (value)
    //                         cursor.next().then(value=>{
    //                             console.log(value)
    //                             cursor.hasNext().then(value => {
    //                                 if (value)
    //                                     cursor.next().then(value=>{
    //                                         console.log(value)
    //                                     })
    //                             })
    //
    //                         })
    //                 })
    //
    //             })
    //     })
    //
    // })

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}

async function deleteStudent(student) {
    let mongo = await mongoClient.connect(url)
    let db = await mongo.db(db_name)
    let deleteResult = await db.collection(collection).deleteOne(
        {
            firstname: student.firstname,
            lastname: student.lastname
        }
    )
    return deleteResult;

}

async function updateStudent(student) {
    const mongo = await mongoClient.connect(url);
    const db = await mongo.db(db_name);
    const updateResult = await db.collection(collection).updateOne(
        {
            firstname: student.firstname,
            lastname: student.lastname,
            studentID:student.studentID,
        }, {
            $set: {
                firstname: student.newFirstname,
                lastname: student.newLastname,
                studentID: student.newStudentID,
                department: student.newDepartment,
                gender: student.newGender,
                dorm: student.newDorm,
                phoneNumber: student.newPhoneNumber,
            }
        })
    return updateResult;
}

module.exports.addStudent = addStudent
module.exports.getStudents = getStudents
module.exports.deleteStudents = deleteStudent
module.exports.updateStudent = updateStudent