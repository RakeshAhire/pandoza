import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EmployeeRoutes = ({ children }) => {
    const { userDetails } = useContext(AuthContext);
    // console.log('userDetails: ', userDetails);

    if (userDetails.role === "employee") {
        return children;
    }
    return <Navigate to="/" />
}

export default EmployeeRoutes