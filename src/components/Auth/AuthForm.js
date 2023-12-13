import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isReqSending, setIsReqSending] = useState(false);

  const enteredEmail = useRef();
  const enteredPassword = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async(e) => {
    try {
      setIsReqSending(true)
      e.preventDefault();
      const obj = {
        email: enteredEmail.current.value,
        password: enteredPassword.current.value
      }
      
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
        method: 'POST',
        headers: { 
          'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      if (!res.ok) {
        throw new Error('Request failed!');
      }
      const data = await res.json();
      console.log('data',data);
      setIsReqSending(false);
    }catch(err) {
      alert(err.message)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={enteredEmail}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={enteredPassword}
          />
        </div>
        <div className={classes.actions}>
          {isReqSending ? <p style={{color: 'white'}}>Sending Request....</p> : <button type='submit'>Submit</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
