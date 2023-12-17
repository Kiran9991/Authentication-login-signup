import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../Context/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    
    const enteredNewPassword = newPasswordInputRef.current.value;

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    alert(`Successfully updated password`);
    const data = await res.json();
    console.log('resp',data);
    newPasswordInputRef.current.value = '';
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
