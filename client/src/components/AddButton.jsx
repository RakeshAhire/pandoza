import React, { useState } from 'react'

const AddButton = ({ text = "ADD", handlePopUp }) => {
    return (
        <div className='absolute top-[5%] right-[11%] shadow-lg'>
            <button
                className='bg-white text-center py-1.5 px-8 rounded-md w-full shadow-md'
                onClick={() => handlePopUp()}
            >
                {text}
            </button>
        </div>
    )
}

export default AddButton