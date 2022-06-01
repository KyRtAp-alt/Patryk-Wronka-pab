const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const AuthorsSchema = new Schema({
    name: String,
    bio: String
})
const BooksSchema = new Schema({

    name: String,
    description: String,
    price: Number,
    releaseDate: String,
    bookCategory: String,
    numberOfPages: Number
})
const PublishingHousesSchema = new Schema({
    name: String,
    description: String
})
const authors = model('Authors',AuthorsSchema);
const books = model('Books',BooksSchema);
const publishingHouses = model('PublishingHouses',PublishingHousesSchema);

main().catch(err => console.log(err));
async function main()
{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.qxenmyc.mongodb.net/?retryWrites=true&w=majority')
}

async function addAuthors({name, bio}){
    const author = new authors();

    author.name = name
    author.bio = bio
    await author.save();
}

async function getAuthors() {
    return await authors.find({});
}
async function getAuthor({authorId}) {
    
    return await authors.findOne({_id: authorId});
} 
async function updateAuthor({authorId},update) {
    
    return await authors.findOneAndUpdate({_id: authorId},update);
} 
async function deleteAuthor({authorId}) {
    
    return await authors.findOneAndDelete({_id: authorId});
} 
async function addPublishingHouses({name, description}){
    const publishingHouse = new publishingHouses();
    publishingHouse.name = name
    publishingHouse.description = description
    await publishingHouse.save();
}

async function getPublishingHouses() {
    return await publishingHouses.find({});
}
async function getPublishingHouse({publishinghouseId}) {
    
    return await publishingHouses.findOne({_id: publishinghouseId});
} 
async function updatePublishingHouse({publishinghouseId},update) {
    
    return await publishingHouses.findOneAndUpdate({_id: publishinghouseId},update);
} 
async function deletePublishingHouse({publishinghouseId}) {
    
    return await publishingHouses.findOneAndDelete({_id: publishinghouseId});
} 
async function addBooks({
    name, 
    description, 
    price, 
    releaseDate, 
    bookCategory, 
    numberOfPages
}){
    const book = new books();
    book.name = name;
    book.description= description;
    book.price = price;
    book.releaseDate = releaseDate;
    book.bookCategory = bookCategory;
    book.numberOfPages = numberOfPages;
    await book.save();
}

async function getBooks() {
    return await books.find({});
}
async function getBook({bookId}) {
    
    return await books.findOne({_id: bookId});
} 
async function updateBook({bookId},update) {
    
    return await books.findOneAndUpdate({_id: bookId},update);
} 
async function deleteBook({bookId}) {
    
    return await books.findOneAndDelete({_id: bookId});
} 
module.exports = {
    addAuthors,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,

    addBooks,
    getBooks,
    getBook,
    updateBook,
    deleteBook,

    addPublishingHouses,
    getPublishingHouses,
    getPublishingHouse,
    updatePublishingHouse,
    deletePublishingHouse


}