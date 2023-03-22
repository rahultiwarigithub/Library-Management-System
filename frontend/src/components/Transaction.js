import {React, useContext, useState } from 'react';
import BooksContext from '../context/booksContext';
import styled from 'styled-components';

const ToggleForm = styled.form`
    padding: 0.6rem;
    padding-left: 18rem;
    padding-right: 18rem;
    margin-bottom: -3.6rem;
    align-items: center;
    text-align: center
`

export default function ConfirmCheck(props) {

  const booksCtx = useContext(BooksContext);
  const { borrowBook, returnBook } = booksCtx;

  const [username, setUsername] = useState(null);

  const usernameHandler = (e) => {
      setUsername(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (props.type === "borrow") {
      if (await borrowBook(username, props.name)){
        window.location.reload(true);
      };
    }
    if (props.type === "return") {
      if (await returnBook(username, props.name)){
        window.location.reload(true);
      };
    }

    setUsername(null);
  }

  return (
    <ToggleForm onSubmit={submitHandler}>
        <div className="form-group">
            <input type="text" className="form-control" id="toggleForm" name="username" placeholder="Enter your registered username to proceed" onChange={usernameHandler}/>
        </div>
        <button type="submit" className="btn btn-primary my-1">Submit</button>
    </ToggleForm>
  )
}
