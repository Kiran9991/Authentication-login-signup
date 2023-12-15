import React from "react";

const AuthContext = React.createContext({
  idToken: '',
  storeId: (id) => {},
  removeId: () => {},
});

export default AuthContext;
