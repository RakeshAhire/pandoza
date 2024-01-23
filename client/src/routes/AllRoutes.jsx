import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Employee from '../pages/Employee';
import Manage from '../pages/Manage';
import Tasks from '../pages/Tasks';
import Login from '../pages/Login';
import Wrapper from '../components/Wrapper';
import AdminRoutes from './AdminRoutes';
import UserDashboard from '../pages/UserDashboard';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../pages/AdminDashboard';
import EmployeeRoutes from './EmployeeRoutes';
import UnreadTasks from '../pages/UnreadTasks';

const AllRoutes = () => {
    const { userDetails } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/"
                element={
                    <Wrapper>
                        {userDetails.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
                    </Wrapper>
                }
            />
            <Route path="/employee/unreadtasks" element={<Wrapper><EmployeeRoutes><UnreadTasks /></EmployeeRoutes></Wrapper>} />
            <Route path="/employee" element={<Wrapper><AdminRoutes><Employee /></AdminRoutes></Wrapper>} />
            <Route path="/manage" element={<Wrapper><AdminRoutes><Manage /></AdminRoutes></Wrapper>} />
            <Route path="/tasks" element={<Wrapper><AdminRoutes><Tasks /></AdminRoutes></Wrapper>} />
        </Routes>
    )
}

export default AllRoutes