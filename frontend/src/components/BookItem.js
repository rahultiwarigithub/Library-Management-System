import React, { useState } from 'react';
import styled from 'styled-components';
import Transaction from './Transaction';

const ItemLayout = styled.div`
    padding: 0.2rem;
    margin: 0.5rem;
    font-weight: bold;
    background: #ef6868;
    border: 1px solid grey;
    border-radius: 5px;
`

const ItemView = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    margin-bottom: 0rem;
    border: 1px solid grey;
    border-radius: 5px;
    background: rgb(110, 120, 140);
    color: white;
`

const BookIcon = styled.div`
    font-size: 2rem;
    padding-left: 3.5rem;
    margin-right: 2rem;
    margin-top: -1rem;
    margin-bottom: -2rem;
    align-items: center;
`

const ActButton = styled.button`
    margin: 2.5rem;
    margin-right: 0.5rem;
    margin-top: 0.6rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
`

export default function BookItem(props) {

    const {name, author, availability_status} = props.book;
    
    const [updateUser, setUpdateUser] = useState(false);
    const [requestType, setRequestType] = useState("borrow");

    const updateBook = (type) => {
        setUpdateUser(true);
        if (type === "return") {
            setRequestType("return");
        }
    }

    return (
        <div className="card">
            <ItemLayout className="card-body" style={{ backgroundColor: `${availability_status === 'available' ? "#7bdb7e" : ""}` }}>
                <ItemView>
                    <div className='row'>
                        <BookIcon className='col-2'>
                            📚
                        </BookIcon>
                        <div className='col-3'>
                            {`Name: ${name.toUpperCase()}`}
                        </div>
                        <div className='col-3'>
                            {`Author: ${author.toUpperCase()}`}
                        </div>
                        <div className='col-2'>
                            {`Status : ${availability_status.toUpperCase()}`}
                        </div>
                    </div>
                </ItemView>
                {updateUser &&
                    <Transaction name={name} type={requestType}/>
                }
                {/* <ActButton className="btn btn-light" onClick={() => updateBook()}>Borrow</ActButton>
                <ActButton className="btn btn-light" onClick={() => updateBook("return")}>Return</ActButton> */}
                <ActButton className="btn btn-light" disabled={availability_status === 'unavailable'} onClick={() => updateBook()}>Borrow</ActButton>
                <ActButton className="btn btn-light" disabled={availability_status === 'available'} onClick={() => updateBook("return")}>Return</ActButton>
            </ItemLayout>
        </div>
    )
}
