import React from 'react'
import { useState } from 'react';
import SideMenu from './SideMenu';
import {HiOutlineMenu, HiOutlineX } from'react-icons/hi';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <div className='flex gap-5 bg-white border border-b border-slate-200 py-4 px-7 sticky backdrop-blur-[2px] items-center justify-between'>
        <button className='block lg:hidden text-black '  onClick={() => {
            setOpenSideMenu(!openSideMenu)
        }}>
            {activeMenu ? 
            (<HiOutlineX className="text-2xl" />)
            :
            ( 
            <HiOutlineMenu className="text-2xl" />
            )
            }
        </button>
        <h2 className='text-lg font-medium text-black'>Taskio- Task Manager</h2>
        {
            openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu  activeMenu={activeMenu} />
                </div>
            )
        }
    </div>
  )
}

export default Navbar