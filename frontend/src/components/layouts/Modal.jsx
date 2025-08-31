import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex justify-center items-center w-full  overflow-y-auto overflow-x-hidden bg-black/20 '>
      <div className='relative bg-white rounded-lg shadow-sm dark:border-gray-700 w-full max-w-md'>
        <div className='flex justify-between items-center p-2 border-b  dark:border-blue-500'>
          <h3 className='text-lg font-medium text-blue-500  text-center'>{title}</h3>
          <button
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer'
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className='p-4 md:p-5 space-y-4'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
