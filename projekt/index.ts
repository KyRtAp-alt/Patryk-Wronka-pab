import { add } from "nodemon/lib/rules";
import { addPublishingHouses } from "./db";



const express = require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());
const db = require("./db.js")
app.get('/', async function (req, res) {
res.send("Hello")
});



app.get('/authors', async function (req, res) {
    var allAuthors = await db.getAuthors();
    res.render("AuthorsViews/index", {allAuthors});
    
});
app.get('/authors/add', async function (req, res) 
{
    res.render("AuthorsViews/add");
});
app.get('/authors/:authorId/edit', async function (req, res) 
{
    var author = await db.getAuthor(req.params);
    res.render("AuthorsViews/edit", {author});
});
app.post('/authors/add', async function (req, res) 
{
    await db.addAuthors(req.body);
    res.render("AuthorsViews/add");
});
app.post('/authors/:authorId/edit', async function (req, res) 
{

    await db.updateAuthor(req.params,req.body);
    var allAuthors = await db.getAuthors();

    res.render("AuthorsViews/index",{allAuthors});
});
app.post('/authors/:authorId/delete', async function (req, res) 
{
    await db.deleteAuthor(req.params);
    var allAuthors = await db.getAuthors();
    res.render("AuthorsViews/index",{allAuthors});
});


app.get('/books', async function (req, res) {
    var allBooks = await db.getBooks();
    res.render("BooksViews/index",{allBooks});
});
app.get('/books/add', async function (req, res) 
{
    res.render("BooksViews/add");
});
app.get('/books/:bookId/edit', async function (req, res) 
{
    var book = await db.getBook(req.params);
    res.render("BooksViews/edit", {book});
});
app.post('/books/add', async function (req, res) 
{
    await db.addBooks(req.body);
    res.render("BooksViews/add");
});
app.post('/books/:bookId/edit', async function (req, res) 
{

    await db.updateBook(req.params,req.body);
    var allBooks = await db.getBooks();

    res.render("BooksViews/index",{allBooks});
});
app.post('/books/:bookId/delete', async function (req, res) 
{
    await db.deleteBook(req.params);
    var allBooks = await db.getBooks();
    res.render("BooksViews/index",{allBooks});
});


app.get('/publishinghouses', async function (req, res) {
    var allPublishingHouses = await db.getPublishingHouses()

    res.render("PublishingHousesViews/index",{allPublishingHouses});
});
app.get('/publishinghouses/add', async function (req, res) 
{
    res.render("PublishingHousesViews/add");
});
app.get('/publishinghouses/:publishinghouseId/edit', async function (req, res) 
{
    var publishinghouse = await db.getPublishingHouse(req.params);
    res.render("PublishingHousesViews/edit", {publishinghouse});
});

app.post('/publishinghouses/add', async function (req, res) 
{
    await db.addPublishingHouses(req.body);
    res.render("PublishingHousesViews/add");
});
app.post('/publishinghouses/:publishinghouseId/edit', async function (req, res) 
{

    await db.updatePublishingHouse(req.params,req.body);
    var allPublishingHouses = await db.getPublishingHouses();

    res.render("PublishingHousesViews/index",{allPublishingHouses});
});
app.post('/publishinghouses/:publishinghouseId/delete', async function (req, res) 
{
    await db.deletePublishingHouse(req.params);
    var allPublishingHouses = await db.getPublishingHouses();
    res.render("PublishingHousesViews/index",{allPublishingHouses});
});


app.listen(3000, function() {
    console.log("Server is running..")
});

