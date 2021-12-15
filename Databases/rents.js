const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const db_name = "Infoken";
const collection = 'Rents';
function addRent(rent) {
    mongoClient.connect(url,(error,db)=>{
        if (error) {
            console.log("unable to connect to the database \\Rents.")
            throw new Error("unable to connect.")
        }

        let database = db.db(db_name)
        database.collection(collection).insertOne({
            firstname:rent.firstname,
            lastname:rent.lastname,
            studentID:rent.studentID,
            department:rent.department,
            dorm:rent.dorm,
            phoneNumber:rent.phoneNumber,
            registrarID:rent.registrarID,

            title:rent.title,
            category:rent.category,
            author:rent.author,
            date:rent.date

        }, (error,result)=>{
            if (error) {
                console.log(`unable rent ${rent.title} to ${rent.firstname}`);
                throw new Error("book not rented")
            }
            console.log(`${rent.title} is rented to ${rent.firstname} successfully`);
            return true;
        })

    })
}

async function getRents() {
    let mongo;
    try{
        mongo = await mongoClient.connect(url)
    }catch (e) {
        if (e.name.toString() === "MongoServerSelectionError")
            console.log("Server Selection Error")

        console.log("unable to retrieve rents \n" + e.name)
        return undefined;
    }

    const database = mongo.db(db_name);
    const cursor = database.collection(collection).find();
    let hasNext = await cursor.hasNext();

    let values = []

    while(hasNext){
        let value = await cursor.next();
        values.push(value)
        hasNext = await cursor.hasNext();
    }

    return new Promise((resolve, reject) => {
        resolve(values)
    })
}



module.exports.addRent = addRent
module.exports.getRents = getRents