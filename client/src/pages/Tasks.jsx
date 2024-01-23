import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddButton from '../components/AddButton'
import PopUpModal from '../components/PopUpModel';
import useFetch from '../customhook/useFetch';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';

const Tasks = () => {
  const TableHeadings = ["Tasks", "User Name", "Status"];
  const { data, loading, reFetch } = useFetch("/api/task/getall");
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [assignTaskPopUpShow, setAssignTaskPopUpShow] = useState(false);
  const [showEmployeeSuggestion, setShowEmployeeSuggestion] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    employeeName: "",
    employeeId: "",
    title: ""
  });
  const { data: employeeData } = useFetch("/api/user/getall")
  useEffect(() => {
    // Update filteredTaskData when data changes
    setFilteredTaskData(data);
  }, [data]);
  // console.log('filteredTaskData: ', filteredTaskData);

  const handlePopUp = () => {
    setAssignTaskPopUpShow(!assignTaskPopUpShow)
  }

  const handleTaskDetails = (e) => {
    const { value, name } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmployeeId = (item) => {
    setTaskDetails(prev => ({ ...prev, employeeId: item._id, employeeName: item.userName }))
    setShowEmployeeSuggestion(false)
  }

  const handleFilter = (e) => {
    const statusValue = e.target.value;
    const filterTasks = [...data].filter((item, index) =>
      item.status === statusValue
    )
    setFilteredTaskData(filterTasks)
  }

  const handleAssignTask = async () => {
    try {
      // console.log("TaskDetails", taskDetails)
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/task/create`, taskDetails, {
        withCredentials: true
      });
      // console.log('response:', response.data);
      reFetch();
      setTaskDetails({
        employeeName: "",
        employeeId: "",
        title: ""
      })
      toast.success(response.data.message, {
        duration: 3000,
        position: 'top-right'
      });
      setAssignTaskPopUpShow(false);
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'top-right'
      });
      console.error('Error assigning task:', error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {
        assignTaskPopUpShow &&
        <PopUpModal handlePopUp={handlePopUp} >
          <div className="w-3/4 relative flex flex-col items-center justify-center gap-3">
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Employee Name"
              name='employeeName'
              value={taskDetails.employeeName}
              onChange={handleTaskDetails}
              onClick={() => setShowEmployeeSuggestion(prev => !prev)}
            />
            {
              showEmployeeSuggestion && <div className="w-full h-3/4 overflow-auto bg-blue-200 border absolute top-10 left-0">
                {
                  employeeData.length > 0 && employeeData.map((item, index) =>
                    <h1 onClick={() => handleEmployeeId(item)}
                      className="w-full border py-1 cursor-pointer hover:bg-blue-300"
                    >
                      {item.userName}
                    </h1>
                  )
                }
              </div>
            }
            <input
              type="text"
              className="w-full border-b border-gray-500 py-2 px-2 outline-none"
              placeholder="Task Name"
              name='title'
              value={taskDetails.title}
              onChange={handleTaskDetails}
            />
            <button
              className="bg-gray-300 mt-8 py-2 px-4 rounded hover:bg-gray-400"
              onClick={handleAssignTask}
            >
              Assign
            </button>
          </div>
        </PopUpModal>
      }
      <AddButton handlePopUp={handlePopUp} text='Add Task' />
      <div className='overflow-auto'>
        <div className='w-full flex justify-end mb-2'>
          <select
            type="text"
            className="border-b border-gray-500 py-2 px-2 outline-none"
            placeholder="Role"
            name="role"
            onChange={handleFilter}
          >
            <option value="">Filter by Status</option>
            <option value="inProgress">In Progress</option>
            <option value="complete">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {filteredTaskData.length > 0 ?
          <table className='w-full text-center '>
            <thead className="" >
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
                filteredTaskData.map((item, index) =>
                  <tr key={item._id} className='border-gray-400 '>
                    <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.title}</td>
                    <td className='border-b-2 border-r-2 border-gray-400 p-2'>{item.employeeId?.userName}</td>
                    <td className='border-b-2 border-gray-400 p-2'>{item.status}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          :
          <div className="w-full mb-4 p-4 border-b cursor-pointer hover:bg-gray-300 rounded-md">
            <p className="text-xl font-bold"> No Task Found !</p>
            <p className="text-gray-600">Possible reasons : </p>
            <p className="text-gray-600">1-: Change the filter value.</p>
            <p className="text-gray-600">2-: Click "Add Task" autton to assign task.</p>
          </div>
        }
      </div>
      <Toaster />
    </>
  )
}

export default Tasks