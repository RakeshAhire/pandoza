import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import PopUpModal from '../components/PopUpModel'
import useFetch from '../customhook/useFetch'
import axios from 'axios'
import Loading from '../components/Loading'
import toast, { Toaster } from 'react-hot-toast'

const Employee = () => {
  const [showEmployeePopUp, setShowEmployeePopUp] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    userId: "",
    userName: "",
    password: "1234",
    role: "employee"
  })
  const TableHeadings = ["User ID", "Name", "Tasks"];
  const { data, loading, error, reFetch } = useFetch("/api/user/getall")
  // console.log('data: ', data);

  const handlePopUp = () => {
    setShowEmployeePopUp(!showEmployeePopUp)
  }
  const handleEmployeeDetails = (e) => {
    const { value, name } = e.target;
    setEmployeeDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEmployee = async () => {
    if (employeeDetails.userId === "" || employeeDetails.userName == "") {
      return toast.error("Fill Employee Details", {
        duration: 3000,
        position: 'top-right'
      });
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/auth/register`, employeeDetails);
      // console.log('Employ:', response.data);
      toast.success(response.data.message, {
        duration: 3000,
        position: 'top-right'
      });
      setShowEmployeePopUp(false);
      reFetch()
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'top-right'
      });
      console.log('error: ', error);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {
        showEmployeePopUp &&
        <PopUpModal handlePopUp={handlePopUp} >
          <div className="w-3/4 flex flex-col items-center justify-center gap-3">
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Employee Name"
              name="userName"
              value={employeeDetails.userName}
              onChange={handleEmployeeDetails}
            />
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Employee Id"
              name="userId"
              value={employeeDetails.userId}
              onChange={handleEmployeeDetails}
            />

            <button
              className="bg-gray-300 mt-8 py-2 px-4 rounded hover:bg-gray-400"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
          </div>
        </PopUpModal>
      }
      <AddButton text='Add Employee' handlePopUp={handlePopUp} />
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
                <tr className='border-gray-400 '>
                  <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.userId}</td>
                  <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.userName}</td>
                  <td className='border-b-2 border-gray-400 p-2'>Tasks</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  )
}

export default Employee