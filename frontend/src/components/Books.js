import {React, useContext} from 'react';
import styled from 'styled-components';
import AuthContext from '../context/authContext';
import BooksContext from '../context/booksContext';
import AddBook from './AddBook';
import BookItem from './BookItem';
import RemoveBook from './RemoveBook';
import './Books.css'

const BooksHeader = styled.h2`
    padding: 2rem;
    padding-left: 0;
    padding-bottom: 1.5rem;
    color: #FAE6FF;
`

export default function Books() {

    const authCtx = useContext(AuthContext);
    const {isAdmin} = authCtx;

    const booksCtx = useContext(BooksContext);
    const {books} = booksCtx;

    return (
        <div>
            {isAdmin && <AddBook books={books}/>}
            {isAdmin && <RemoveBook books={books}/>}

            <BooksHeader>📚 BOOKS</BooksHeader>
            <div className='row colorbox-row'>
                <div className='col-1 colorbox-col column1'>Available</div>
                <div className='col-1 colorbox-col column2 card'></div>
                <div className='col-1 colorbox-col column3'>Unavailable</div>
                <div className='col-1 colorbox-col column4 card'></div>
            </div>
            {books.length === 0 && <h3 style={{ color: "red" }}>No books to display</h3>}
            {books.map(book => {
                return <BookItem key={book._id}  book={book} />
            })}
        </div>
    )
}
