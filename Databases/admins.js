const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/";
const db_name = "Infoken";
const collection = 'Admins';

function addAdmin(admin) {
    add(admin);
}

async function allAdmins() {
    return await all();
}

async function add(admin) {
    let database = await Mongo(url);
    let inserted = await database.collection(collection).insertOne({
        firstname: admin.firstname,
        lastname: admin.lastname,
        username: admin.username,
        password: admin.password,
        phoneNumber: admin.phoneNumber
    });
    console.log(inserted.acknowledged)
    return inserted.acknowledged;
}

async function all() {
    let database = await Mongo(url);
    let cursor = database.collection(collection).find()

    let hasnext = await cursor.hasNext();
    let admins = [];

    while (hasnext) {
        let value = await cursor.next();
        admins.push(value)
        hasnext = await cursor.hasNext();
    }
    return admins;
}

async function Mongo(url) {
    let mongo = await MongoClient.connect(url);
    return await mongo.db(db_name);
}

async function updateAdmin(admin) {
    const database = await Mongo(url);

    const updateResult = await database.collection(collection).updateOne(
        {
            firstname: admin["firstname"],
            lastname: admin["lastname"],
            username: admin["username"],
            password: admin["password"]
        }, {
            $set: {
                firstname: admin["Newfirstname"],
                lastname: admin['Newlastname'],
                username: admin['Newusername'],
                password: admin['Newpassword'],
                phoneNumber: admin['NewphoneNumber']
            }
        }
    );
    return await updateResult;
}

async function deleteAdmin(admin){
    const db = await Mongo(url);
    const deleteResult = await db.collection(collection).deleteOne({
        firstname: admin["firstname"],
        lastname: admin['lastname'],
    });

    return deleteResult;

}

module.exports.addAdmin = addAdmin;
module.exports.allAdmins = allAdmins;
module.exports.updateAdmin = updateAdmin
module.exports.deleteAdmin = deleteAdmin