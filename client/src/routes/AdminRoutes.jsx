import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoutes = ({ children }) => {
    const { userDetails } = useContext(AuthContext);
    // console.log('userDetails: ', userDetails);

    if (userDetails.role === "admin") {
        return children;
    }
    return <Navigate to="/" />
}

export default AdminRoutes