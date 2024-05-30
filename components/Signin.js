import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="sign-in text-center d-flex flex-column justify-content-center align-content-center"
    >
      <h1>Welcome to Tavern!</h1>
      <span className="login-sub-text">Click the button below to login!</span>
      <Button type="button" className="login-btn" onClick={signIn}>
        Login
      </Button>
    </div>
  );
}

export default Signin;
