import { React, useContext, useState } from 'react';
import styled from 'styled-components';
import BooksContext from '../context/booksContext';

const BookForm = styled.form`
    margin: 10rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-left: 15rem;
    padding-right: 15rem;
    background: lightgrey;
`


export default function AddBook(props) {

    const booksCtx = useContext(BooksContext);
    const { addBook } = booksCtx;

    const [book, setBook] = useState({name: "", author: ""});

    const onChange = (e) => {
        setBook((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value } 
        });
    }

    const addBookHandler = async (e) => {
        e.preventDefault();
        if (await addBook(book)) {
            window.location.reload(true);
        }
    }

    return (
        <>
        <BookForm className='card'>
            <div className="form-group my-0">
                <label htmlFor="bookNameId"></label>
                <input type="text" className="form-control" id="bookNameId" placeholder="Book Name" name="name" onChange={onChange} />
            </div>
            <div className="form-group my-0">
                <label htmlFor="authorNameId"></label>
                <input type="text" className="form-control" id="authorNameId" placeholder="Author Name" name="author" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary my-4" onClick={addBookHandler}>Add Book</button>
        </BookForm>
        </>
    )
}
