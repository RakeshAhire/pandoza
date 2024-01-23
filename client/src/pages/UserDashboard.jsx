import React from 'react'
import useFetch from '../customhook/useFetch'
import axios from 'axios';
import Loading from '../components/Loading';
import { toast, Toaster } from 'react-hot-toast';


const UserDashboard = () => {
  const TableHeadings = ["Tasks", "Name", "Status", "Action"];
  const { data, loading, error, reFetch } = useFetch("/api/task/getall");

  const handleStatusUpdate = async (e, task) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_API}/api/task/update/${task._id}`,
        { status: e.target.value }, { withCredentials: true }
      );
      toast.success(response.data.message, {
        duration: 3000,
        position: 'top-right'
      });
      reFetch()
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'top-right'
      });
    }
  }
  return (
    <div className='overflow-auto'>
      {loading && <Loading />}
      <table className='w-full text-center '>
        <thead >
          <tr className='border-b-2  border-gray-400 p-1'>
            {
              TableHeadings.map((item, index) =>
                <th key={index} className='border-b-2  border-gray-400 p-1'>{item}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 && data.map((item, index) =>
              <tr key={item._id} className='border-gray-400 '>
                <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.title}</td>
                <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.employeeId?.userName}</td>
                <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.status}</td>
                <td className='border-b-2 border-gray-400 p-2'>
                  <select onChange={(e) => handleStatusUpdate(e, item)} name="" id="">
                    <option value="">Change Status</option>
                    <option value="inProgress">In Progress</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Toaster />
    </div>
  )
}

export default UserDashboard