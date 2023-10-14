import React from "react";
import { useState } from "react";
import ILoginResponse from "../Models/ILoginResponse";

export interface IAuthContext {
  setAuth: Function;
  removeAuth: Function;
  auth: ILoginResponse | null;
}
const AuthContext = React.createContext<IAuthContext>({
  auth: null,
  setAuth: (auth: ILoginResponse) => console.warn("no auth provider"),
  removeAuth: () => console.warn("no auth provider"),
});

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const getAuth = (): ILoginResponse | null => {
    const authString = localStorage.getItem("auth");
    if (!authString || authString === "undefined") {
      return null;
    }
    //долната проверка може да се махне
    return authString ? JSON.parse(authString) : null;
  };

  const saveAuth = (userAuth: ILoginResponse) => {
    localStorage.setItem("auth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };

  const [auth, setAuth] = useState(getAuth());

  const removeAuth = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        setAuth: saveAuth,
        removeAuth,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
