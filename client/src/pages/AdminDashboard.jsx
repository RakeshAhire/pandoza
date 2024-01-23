import React, { useState } from 'react'
import PieChart from '../components/PieChart'


const AdminDashboard = () => {

  const firstChartValue = [30, 20, 15, 35];
  const [chartData, setChartData] = useState(firstChartValue)
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-3/5 h-3/4 flex justify-center items-center ">
        <PieChart data={chartData} />
      </div>
    </div>
  )
}

export default AdminDashboard