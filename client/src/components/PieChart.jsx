import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartData = {
        labels: ["Cancelled", "Progress","Completed", "Delayed"],
        datasets: [
            {
                data: data,
                backgroundColor: ['#D0D3D4' ,'#85C1E9',"#A9DFBF",'#F5B7B1'],
            },
        ],
    }
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        }
    }
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myPieChart = new Chart(ctx, {
            type: 'pie', // Change the chart type to 'pie'
            data: chartData,
            options: chartOptions,
        });

        return () => {
            myPieChart.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default PieChart;
