import { createContext, useState, useEffect } from "react";
import axios from "axios";


const BooksContext = createContext();

export const BooksContextProvider = (props) => {
    
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const [books, setBooks] = useState([]);
    const getBooks = async () => {
        try {
            const {data} = await axios.get('/v1/library/books');
            setBooks(data);
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
    }
    
    useEffect(() => {
        getBooks();
    }, [])

    const addBook = async (book) => {
        try {
            book.author = book.author === "" ? undefined : book.author;
            if (book.name) {
                const response = await axios.post('/v1/library/admin/addbook', book, config);
                if (response.status === 201) {
                    alert("Book added successfully");
                    return true;
                };
            } else {
                alert("Please provide proper bookname to add book");
            }
        } catch (err) {
            console.log(err);
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
        return false;
    }

    const deleteBook = async (bookname) => {
        try {
            if (bookname) {
                const response = await axios.delete(`/v1/library/admin/removebook/${bookname.toLowerCase()}`, config);
                if (response.status === 200) {
                    alert("Book removed successfully");
                    return true;
                };
            } else {
                alert("please provide proper bookname to delete book");
            }
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
        return false;
    }

    const borrowBook = async (username, bookname) => {
        try {
            if (username) {
                const response = await axios.post('/v1/library/users/books/borrow', {username, bookname}, config);
                if (response.status === 201) {
                    alert("Book borrowed successfully");
                    return true;
                };
            } else {
                alert("cannot borrow book without your username");
            }
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
        return false;
    } 

    const returnBook = async (username, bookname) => {
        try {
            if (username) {
                const response = await axios.put('/v1/library/users/books/return', {username, bookname}, config);
                if (response.status === 200) {
                    alert("Book returned successfully");
                    return true;
                };
            } else {
                alert("cannot return book without your username");
            }
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
        return false;
    } 

    return (
        <BooksContext.Provider value={{ books, addBook, deleteBook, borrowBook, returnBook }}>
            { props.children }
        </BooksContext.Provider>
    )
};

export default BooksContext;