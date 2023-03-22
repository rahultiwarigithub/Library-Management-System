import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../context/authContext';

const RegisterHeader = styled.h2`
    padding: 2rem;
    padding-left: 0;
    padding-bottom: 1.5rem;
    color: #FAE6FF;
`

const RegisterForm = styled.div`
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
  const { onRegister } = authCtx;

  const [details, setDetails] = useState({username: "", name: "", email: "", contact: ""});

  const onChange = (e) => {
      setDetails((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value } 
      });
  }

  const handleRegisterSubmit = async(e) => {
      e.preventDefault();
      onRegister(details);

      setDetails({username: "", name: "", email: "", contact: ""});
      e.target.reset();
  }

  return (
    <>
        <RegisterHeader>📝 ENROLL</RegisterHeader>
        <div className='card'>
            <RegisterForm>
                <form onSubmit={handleRegisterSubmit}>
                  <FormElement className="form-group">
                        <label htmlFor="username">Select Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" onChange={onChange} />
                    </FormElement>
                    <FormElement className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter you name" onChange={onChange} />
                    </FormElement>
                    <FormElement className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your email" onChange={onChange} />
                    </FormElement>
                    <FormElement className="form-group">
                        <label htmlFor="contact">Mobile Number</label>
                        <input type="text" className="form-control" id="contact" name="contact" placeholder="Enter you contact info" onChange={onChange} />
                    </FormElement>
                    <FormElement>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </FormElement>
                </form>
            </RegisterForm>
        </div>
        </>
  )
}
