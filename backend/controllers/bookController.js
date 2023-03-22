const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');


/* function to get status of a given book */
const getBookStatus = asyncHandler(async (req, res) => {
    
    const book = await Book.findOne({ name:req.params.bookname });
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404);
        throw new Error("book not found")
    }
});

/* function to get all the books */
const getAllBooks = asyncHandler(async (req, res) => {

    const allBooks = await Book.find();
    if (allBooks) {
        res.status(200).json(allBooks);
    } else {
        res.status(404);
        throw new Error("resource not found")
    }
});

/* function to get all the books having available status */
const getAvailableBooks = asyncHandler(async (req, res) => {

    const allBooks = await Book.find({ availability_status: "available" });
    if (allBooks) {
        res.status(200).json(allBooks);
    } else {
        res.status(404);
        throw new Error("resource not found")
    }
});

/* function to add a new book */
const addBook = asyncHandler(async (req, res) => {

    const { name, author, availability_status } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("provide book name you want to add");
    }

    // get a book if already exists with new book name
    const duplicateBook = await Book.findOne({ name: name.toLowerCase() });
    if (duplicateBook) {
        res.status(400);
        throw new Error("book already available");
    }

    // create new book in database
    const book = await Book.create({
        name,
        author,
        availability_status
    })
    if (book) {
        res.status(201).json(book);
    } else {
        res.status(400);
        throw new Error("book data not valid");
    }
});

/* function to remove a book */
const removeBook = asyncHandler(async (req, res) => {

    const book = await Book.findOne({ name:req.params.bookname });
    if (!book) {
        res.status(404);
        throw new Error("book not found");
    }

    // delete given bookname record from database
    await Book.deleteOne({ name:req.params.bookname });
    res.status(200).json({ message: "deleted successfully" });
});



module.exports = {
    getBookStatus,
    getAllBooks,
    getAvailableBooks,
    addBook,
    removeBook
}