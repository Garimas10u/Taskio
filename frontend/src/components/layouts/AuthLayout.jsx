import React from 'react'
import logo from '../../assets/logo.svg'
import UI_IMG from '../../assets/auth-img.png'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-gradient-to-tr from-[#e1e1f2] to-[#4795ed]'> 
            <img src={logo} width="100" alt="" />
            {children}
        </div>

        <div className='hidden md:flex w-[40vw] h-screen '>
        <img className='object-cover w-full h-full' src={UI_IMG} alt="Auth" />
        </div>
    </div>

  )
}

export default AuthLayout


