import React from 'react'
import logo from '../../assets/logo.svg'
import UI_IMG from '../../assets/auth-img.png'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className=' md:w-[60vw] px-12 pt-8 pb-12 bg-gradient-to-tr from-[#e1e1f2] to-[#80b7f7]'> 
            <img src={logo} width="100" alt="" />
            {children}
        </div>

        <div className='hidden md:flex w-[40vw]  '>
        <img className='object-cover ' src={UI_IMG} alt="Auth" />
        </div>
    </div>

  )
}

export default AuthLayout


