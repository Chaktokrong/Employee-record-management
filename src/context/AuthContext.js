import React, { useReducer, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// reducer
const firebaseReducer = (state, action) => {
  // console.log("state::", state)
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const [role, setRole] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log(user?.auth?.currentUser.displayName, "user");
        user?.auth?.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // Send token to your backend via HTTPS
            // console.log( "idToken" ,idToken);
            setRole(user?.auth?.currentUser?.displayName);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: user?.email,
                token: idToken,
              },
            });
          })
          .catch(function (error) {
            // Handle error
          });
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        });
      }
    });

    // console.log(
    //   "noneUserAccesse : ",

    // );
    // let my = noneUserAccesse(["admin", "employee"]);
    // console.log(my);
    // cleanup
    return () => unsubscribe();
  }, []);

  // Check role and Permissions
  // this function call when we need to disable the component
  const noneUserAccesse = (roles) => {
    // role = eployee
    const getRole = roles.filter((rol) => rol === role);
    if (getRole.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const value = { state, dispatch, noneUserAccesse };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
