import React from 'react'
import useFetch from '../customhook/useFetch'
import Loading from "../components/Loading"
import axios from 'axios'
const UnreadTasks = () => {
    const { data, loading, reFetch } = useFetch("/api/task/unreadtasks")

    const handleUnreadTask = async (task) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_API}/api/task/update/${task._id}`,
                { isRead: true }, { withCredentials: true }
            );
            setTimeout(() => {
                reFetch()
            }, 3000)
        } catch (error) {
            console.log('error: ', error);
        }
    }
    return (
        <div >
            {loading && <Loading />}
            {
                data.length > 0 ? data.map((item, index) => (
                    <div
                        key={item._id}
                        className="w-full mb-4 p-4 border-b cursor-pointer hover:bg-gray-300 rounded-md"
                        onClick={() => handleUnreadTask(item)}
                    >
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600">Task description goes here...</p>
                        <p className="text-gray-600">Click to read</p>
                    </div>
                ))
                    :
                    <div className="w-full mb-4 p-4 border-b cursor-pointer hover:bg-gray-300 rounded-md">
                        <p className="text-xl font-bold">No Unreaded Task !</p>
                        <p className="text-gray-600">Wow...... you are upto date.</p>
                    </div>
            }
        </div>
    )
}

export default UnreadTasks