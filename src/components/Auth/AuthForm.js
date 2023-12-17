import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../Context/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      let url;
      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`;
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`;
      }
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail.current.value,
          password: enteredPassword.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = `Authentication Failed`;

        throw new Error(errorMessage);
      }
      if (isLogin) {
        alert(`Successfully logged in ${data.email}`);
      } else {
        alert(`Successfully created your account ${data.email}`);
      }
      authCtx.login(data.idToken)

      enteredEmail.current.value = "";
      enteredPassword.current.value = "";
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enteredPassword} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? `Login` : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
