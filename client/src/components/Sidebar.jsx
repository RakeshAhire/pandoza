import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { userDetails, isLogout } = useContext(AuthContext)

  const location = useLocation()
  const list = [
    {
      id: 1,
      title: "Unread Task",
      path: "/employee/unreadtasks",
      permission: "employee"

    },
    {
      id: 2,
      title: "Employee",
      path: "/employee",
      permission: "admin"

    },
    {
      id: 3,
      title: "Tasks",
      path: "/tasks",
      permission: "admin"
    },
    {
      id: 4,
      title: "Manage",
      path: "/manage",
      permission: "admin"
    },
  ]
  return (
    <div className='flex flex-col justify-between h-full text-lg bg-white'>
      <div className='flex flex-col gap-7'>
        <div className='text-teal-800 font-semibold flex items-center gap-2 border-b-4'>
          <p className='text-xs '>Welcome</p>
          <h4>{userDetails.userName || "User"}</h4>
        </div>
        <div className='flex flex-col gap-3 '>
          <Link
            className={` ${location.pathname === "/" ? 'bg-gray-300' : ''} py-1 px-2 rounded-md  hover:bg-gray-400`}
            to="/"
          >
            Dashboard
          </Link >
          {list.map((item, i) =>
            userDetails.role === item.permission &&
            <Link
              className={` ${location.pathname === item.path ? 'bg-gray-300' : ''} py-1 px-2 rounded-md  hover:bg-gray-400`}
              key={item.id} to={item.path}>
              {item.title}
            </Link >
          )}
        </div>
      </div>
      <div className='text-center py-1 px-2 bg-gray-300 rounded-md hover:bg-gray-400'>
        <button onClick={() => isLogout()}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar