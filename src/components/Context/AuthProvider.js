import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [ idToken, setIdToken ] = useState('');

  const storeIdToken = (id) => {
    setIdToken(id);
  };

  const removeId = () => {
    setIdToken('');
  };

  const authContext = {
    idToken: idToken,
    storeId: storeIdToken,
    removeId: removeId,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
