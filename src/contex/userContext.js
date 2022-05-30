import React from "react";
import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
    login: localStorage.getItem("token") !== null,
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    // console.log(payload)

    switch (type) {
        case "success":
        case "login":
            localStorage.setItem("token", payload.token);
            localStorage.setItem("user", JSON.stringify(payload));
            return {
                ...state,
                login: true,
                user: payload,
            }
        case "failed":
        case "logout":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                ...state,
                login: false,
                user: null,
            };

        /* falls through */
        default:
            throw new Error();
    }
};

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};