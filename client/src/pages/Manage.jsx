import React, { useState } from 'react'
import axios from 'axios';
import AddButton from '../components/AddButton'
import PopUpModal from '../components/PopUpModel';
import useFetch from '../customhook/useFetch';
import Loading from "../components/Loading";
import { toast, Toaster } from 'react-hot-toast';

const Manage = () => {
  const [assignTaskPopUpShow, setAssignTaskPopUpShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    userName: "",
    password: "",
    role: ""
  });
  const TableHeadings = ["User Id", "Name", "Role"];
  const { data, loading, reFetch } = useFetch("/api/user/getall")
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handlePopUp = () => {
    setAssignTaskPopUpShow(!assignTaskPopUpShow)
  }

  const handleUserDetails = (e) => {
    const { value, name } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEmployee = async () => {
    if (userDetails.userId === "" || userDetails.userName === "" ||
      userDetails.password === "" || userDetails.role === "") {
      return toast.error("User Fileds Should Not Emplty !", {
        duration: 3000,
        position: 'top-right'
      });
    }
    // console.log('userDetails: ', userDetails);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/auth/register`, userDetails);
      // console.log('response:', response.data);
      toast.success(response.data.message, {
        duration: 3000,
        position: 'top-right'
      });
      setAssignTaskPopUpShow(false);
      setUserDetails({
        userId: "",
        userName: "",
        password: "",
        role: ""
      })
      reFetch()
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'top-right'
      });
      setAssignTaskPopUpShow(false)
      // console.error('Error assigning task:', error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {
        assignTaskPopUpShow &&
        <PopUpModal handlePopUp={handlePopUp} >
          <div className="w-3/4 flex flex-col items-center justify-center gap-3">
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="UserId"
              value={userDetails.userId}
              name="userId"
              onChange={handleUserDetails}
            />
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="UserName"
              value={userDetails.userName}
              name="userName"
              onChange={handleUserDetails}
            />
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Password"
              value={userDetails.password}
              name="password"
              onChange={handleUserDetails}
            />
            <select
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Role"
              value={userDetails.role}
              name="role"
              onChange={handleUserDetails}
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <button
              className="bg-gray-300 mt-8 py-2 px-4 rounded hover:bg-gray-400"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
          </div>
        </PopUpModal>
      }
      <AddButton handlePopUp={handlePopUp} text='Add User' />
      <div className='overflow-auto'>
        <table className='w-full text-center '>
          <thead className="" >
            <tr className='border-b-2  border-gray-400 p-1'>
              {
                TableHeadings.map((item, index) =>
                  <th className='border-b-2  border-gray-400 p-1'>{item}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) =>
                <tr key={item._id} className='border-gray-400 '>
                  <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.userId}</td>
                  <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.userName}</td>
                  <td className='border-b-2 border-gray-400 p-2'>{capitalizeFirstLetter(item.role)}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <Toaster />
    </>

  )
}

export default Manage