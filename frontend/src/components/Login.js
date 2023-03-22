import React, { useState, useContext } from 'react';
import { redirect } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/authContext';

const LoginHeader = styled.h2`
    padding: 2rem;
    padding-left: 0;
    padding-bottom: 1.5rem;
    color: #FAE6FF;
`

const LoginForm = styled.div`
    padding: 2rem;
    margin: 0.5rem;
    font-weight: bold;
    background: lightblue;
    border: 1px solid grey;
    border-radius: 5px;
`

const FormElement = styled.div`
    padding: 0.8rem;
    padding-left: 15rem;
    padding-right: 15rem;
    font-size: 1rem;
    font-weight: bold;
`

export default function Login() {

    const authCtx = useContext(AuthContext);
    const { onLogin } = authCtx;

    const [credentials, setCredentials] = useState({userName: "", userPassword: ""});

    const onChange = (e) => {
        setCredentials((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value } 
        });
    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        onLogin(credentials.userName, credentials.userPassword);
    }

    const onLoginClick = () => {
        redirect('/');
    }

    return (
        <>
            <LoginHeader>🧑‍💻 ADMIN</LoginHeader>
            <div className='card'>
                <LoginForm>
                    <form  onSubmit={handleLoginSubmit}>
                        <FormElement className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input type="text" className="form-control" id="userName" name="userName" placeholder="Admin username" onChange={onChange} />
                        </FormElement>
                        <FormElement className="form-group">
                            <label htmlFor="userPassword">Password</label>
                            <input type="password" className="form-control" id="userPassword" name="userPassword" placeholder="Password" onChange={onChange} minLength={5} />
                        </FormElement>
                        <FormElement>
                            <button type="submit" className="btn btn-primary" onClick={onLoginClick}>Login</button>
                        </FormElement>
                    </form>
                </LoginForm>
            </div>
            </>
    )
}
