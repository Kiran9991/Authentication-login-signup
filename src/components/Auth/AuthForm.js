import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const enteredEmail = useRef();
  const enteredPassword = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async(e) => {
    try {
      e.preventDefault();
      
      setIsLoading(true);
      if(isLogin) {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value,
            returnSecureToken: true
          }),
          headers: {
            'content-type': 'application/json'
          }
        })
        const data = await res.json();
        if(!res.ok) {
          throw new Error(`Authentication failed`)
        }
        alert(`Successfully logged in ${data.email}`)
        console.log('data',data.idToken)
        localStorage.setItem('idToken', JSON.stringify(data.idToken));
      }else {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value,
            returnSecureToken: true
          }),
          headers: { 
            'content-type': 'application/json'
          },
        })
        
        const data = await res.json();

        if(!res.ok) {
          let errorMessage = `Authentication Failed`
          if(data && data.error && data.error.message) {
            throw new Error(data.error.message)
          }
          throw new Error(errorMessage)
        }
        alert(`Successfully created your account ${data.email}`);
      }
    }catch(err) {
      alert(err.message)
    }
    enteredEmail.current.value = '';
    enteredPassword.current.value = '';
    setIsLoading(false);
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
          {!isLoading && <button type='submit'>{isLogin ? `Login`:'Create Account'}</button>}
          {isLoading && <p>Sending request....</p>}
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
