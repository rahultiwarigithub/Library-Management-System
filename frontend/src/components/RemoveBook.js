import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import BooksContext from '../context/booksContext';

const BookForm = styled.form`
    margin: 10rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding-left: 15rem;
    padding-right: 15rem;
    background: lightgrey;
`


export default function RemoveBook(props) {

    const booksCtx = useContext(BooksContext);
    const { deleteBook } = booksCtx;
    
    const [bookname, setBookname] = useState("");

    const onChange = (e) => {
        setBookname(e.target.value);
    }

    const deleteBookHandler = async (e) => {
        e.preventDefault();
        if (await deleteBook(bookname)) {
            window.location.reload(true);
        }
    }

    return (
        <>
        <BookForm className='card'>
            <div className="form-group my-0">
                <label htmlFor="bookDeleteId"></label>
                <input type="text" className="form-control" id="bookDeleteId" placeholder="Book Name" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary my-4" onClick={deleteBookHandler}>Remove Book</button>
        </BookForm>
        </>
    )
}
