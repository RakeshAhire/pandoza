import React from 'react'

const PopUpModal = ({ handlePopUp, children }) => {
  return (
    <div className='w-full h-full fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-10 '>
      <div className='flex flex-col items-center justify-center shadow-md  bg-white h-3/4 w-2/5 rounded-lg relative'>
        <button
          className='absolute top-2 right-2 px-4 py-3 bg-black text-white rounded-md'
          onClick={() => handlePopUp()}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default PopUpModal;