import { createContext, useContext, useEffect, useState } from "react";
import { getUserAccount } from "../lib/appwrite";
const GlobaleContext = createContext();

export const useGlobaleContext = () => useContext(GlobaleContext);

export const GlobaleProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserAccount()
      .then((res) => {
        if (res) {
          setisLoggedIn(true);
          setUser(res);
        } else {
          setisLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobaleContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        isLoading,
        setisLoggedIn,
      }}
    >
      {children}
    </GlobaleContext.Provider>
  );
};
