const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/";
const db_name = "Infoken";
const collection = 'Books';

function addBook(book) {
    add(book);
}

async function allBooks() {
    const books = await all();
    return books;
}

async function updateBook(newbook) {

    let database = await Mongo(url);
    return await database.collection(collection).updateOne(
        {
            title: newbook.title,
            category: newbook.category,
            quantity: parseInt(newbook.quantity),
            author: newbook.author,
        }, {
            $set: {
                title: newbook.newTitle,
                category: newbook.newCategory,
                quantity: parseInt(newbook.newQuantity),
                author: newbook.newAuthor,
            }
        });

}

async function add(book) {
    let database = await Mongo(url);
    let inserted = await database.collection(collection).insertOne({
        title: book.title,
        category: book.category,
        quantity: parseInt(book.quantity),
        author: book.author
    });
    console.log(inserted.acknowledged) //
    return inserted.acknowledged;
}

async function all() {
    let database = await Mongo(url);
    let cursor = database.collection(collection).find()

    let hasnext = await cursor.hasNext();
    let books = [];

    console.log("getting all books")

    while (hasnext) {
        let value = await cursor.next();
        books.push(value)
        hasnext = await cursor.hasNext();
    }
    return books;
}

async function deleteBook(book){

    const db = await Mongo();

    console.log("DB : Deleting the document");

    console.log(book);

    return await db.collection(collection).deleteOne({
        title:book['title'],
        category:book['category'],
        quantity: parseInt(book['quantity']),
        author: book['author']
    });

}

async function Mongo() {
    let mongo = await MongoClient.connect(url);
    let database = await mongo.db(db_name);
    return database;
}

module.exports.addBook = addBook;
module.exports.allBooks = allBooks;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;