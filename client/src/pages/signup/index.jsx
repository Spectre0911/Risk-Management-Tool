import React, { useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../login/index.css';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // TODO: Implement sign up logic here
  };

  const handleFileUpload = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <body className='waveBg'>
      <div className='signup-container'>
        <form className='loginForm' onSubmit={handleSubmit}>
          <h1 className='loginH1'>Sign Up</h1>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='loginForm-group'>
            <label class='caption' htmlFor='fullName'>
              Full Name:
            </label>
            <input
              type='text'
              id='fullName'
              className='loginForm-control'
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div className='loginForm-group'>
            <label class='caption' htmlFor='email'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              className='loginForm-control'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className='loginForm-group'>
            <label class='caption' htmlFor='password'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              className='loginForm-control'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className='loginForm-group'>
            <label class='caption' htmlFor='confirmPassword'>
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='loginForm-control'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div className='loginForm-group'>
            <label class='caption' htmlFor='profilePicture'>
              Profile Picture:
            </label>
            <input
              type='file'
              id='profilePicture'
              className='loginForm-control'
              onChange={handleFileUpload}
            />
          </div>
          <button type='submit' className='submit-button'>
            Sign Up
          </button>
          <div>
            <label class='signupLabel'>
              Already have an account? <a href='/login'>Sign In</a>
            </label>
          </div>
        </form>
      </div>
    </body>
  );
};

export default SignUpPage;
