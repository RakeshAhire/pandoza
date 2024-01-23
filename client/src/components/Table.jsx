import React from 'react'

const Table = ({ headings = ["First Field", "Second Field", "Third Field"], data = ["First Data", "Second Data", "Third Data"] }) => {
    return (
        <table className='w-full text-center '>
            <thead className="" >
                <tr className='border-b-2  border-gray-400 p-1'>
                    {
                        headings.map((item, index) =>
                            <th className='border-b-2  border-gray-400 p-1'>{item}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) =>
                        <tr className='border-gray-400 '>
                            <td className='border-b-2 border-r-2 border-gray-400 p-2'>User ID</td>
                            <td className='border-b-2 border-r-2 border-gray-400 p-2'>Name</td>
                            <td className='border-b-2 border-gray-400 p-2'>Role</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table