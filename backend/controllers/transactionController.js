const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');


/* function to borrow a book */
const borrowBook = asyncHandler(async (req, res) => {

    const { username, bookname } = req.body;
    if (!username) {
        res.status(400);
        throw new Error("username mandatory to borrow a book");
    }
    const userData = await User.findOne({ username }, { _id: 0, __v: 0 });
    if (!userData) {
        res.status(401);
        throw new Error("user not registered into the library system");
    }

    // get book data for given bookname
    const bookData = await Book.findOne({ name: bookname }, { _id: 0, __v: 0 });
    if (bookData && bookData.availability_status === "available") {
        bookData.availability_status = undefined;

        // look for record in transaction database for given user
        const transactionData = await Transaction.findOne({ 'user_details.username': username });
        let borrowRequest = null;

        // if no transaction record exists, create new
        if (!transactionData) {
            borrowRequest = await Transaction.create({
                user_details: userData,
                book_details: bookData,
                trans_type: "borrow"
            });
        } else {
            // if transaction record exists, update 
            if (transactionData.trans_type === "return") {
                transactionData.book_details = bookData;
                transactionData.trans_type = "borrow";
                borrowRequest = await transactionData.save();
            } else {
                res.status(400);
                throw new Error("you need to return your borrowed book first");
            }
        }
        
        if (borrowRequest) {
            // bookData.availability_status = "unavailable";
            // await bookData.save();
            await Book.findOneAndUpdate(
                { name: bookname },
                { availability_status: 'unavailable' },
                { new: true }
            );
        }
        res.status(201).json(borrowRequest);
    } else {
        res.status(404);
        throw new Error("book currently unavailable in the library");
    }
});

/* function to return a book */
const returnBook = asyncHandler(async (req, res) => {

    const { username, bookname } = req.body;
    if (!username) {
        res.status(400);
        throw new Error("username mandatory to return a book");
    }

    // look for record in transaction database for given user
    const transactionData = await Transaction.findOne({ 'user_details.username': username });
    if (!transactionData) {
        res.status(404);
        throw new Error("user transaction history not found in library records");
    }

    // if record exists, update
    if (transactionData.book_details.name === bookname) {
        if (transactionData.trans_type === "borrow") {
            const bookData = await Book.findOne({ name: bookname });
            bookData.availability_status = "available";
            if (await bookData.save()) {
                transactionData.trans_type = "return";
                if (await transactionData.save()) {
                    res.status(200).json(transactionData);
                }
            }
        } else {
            res.status(400);
            throw new Error("book has already been returned");
        }
    } else {
        res.status(400);
        throw new Error("no borrow history of book for user in library records");
    }
});

/* function to get all the transactions history */
const transactionsRecord = asyncHandler(async (req, res) => {
    
    const transactionsData = await Transaction.find();
    if (transactionsData) {
        res.status(200).json(transactionsData);
    } else {
        res.status(404);
        throw new Error("resource not found")
    }
});


module.exports = {
    borrowBook,
    returnBook,
    transactionsRecord
}