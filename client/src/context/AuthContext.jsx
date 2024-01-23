import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"))
    // console.log('savedUserDetails: ', savedUserDetails);
    const [userDetails, setUserDetails] = useState(
        {
            userName: savedUserDetails?.userName || "",
            isAuth: savedUserDetails?.isAuth || false,
            role: savedUserDetails?.role || "",
        }
    )
    useEffect(() => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }, [userDetails])

    const isLogin = (user) => {
        // console.log('user: ', user);
        setUserDetails({
            userName: user.userName,
            isAuth: true,
            role: user.role,
        })
    }

    const isLogout = () => {
        setUserDetails({
            userName: "",
            isAuth: false,
            role: "",
        })
    }
    return (
        <AuthContext.Provider value={{ userDetails, isLogin, isLogout }}>
            {children}
        </AuthContext.Provider>
    )
}