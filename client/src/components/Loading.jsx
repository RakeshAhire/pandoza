import React from 'react'

const Loading = () => {
    return (
        <div class="fixed inset-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center">
            <div class="w-12 h-12 border-4 border-white border-t-4 border-t-blue-500 rounded-full animate-spin">
            </div>
        </div>
    )
}

export default Loading;