import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Wrapper = ({ children }) => {
    const { userDetails } = useContext(AuthContext);
    // console.log('userDetails: ', userDetails);
    if (!userDetails.isAuth) {
        return <Navigate to="/login" />
    }

    return (
        <div className=' w-full h-[100vh] flex justify-between  '>
            <div className='w-1/6 flex justify-center shadow-md bg-white px-4 py-4'>
                <Sidebar />
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                <div className='shadow-md p-12 bg-white h-3/4 w-3/4 rounded-lg overflow-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Wrapper