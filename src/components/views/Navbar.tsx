import React, { useEffect, useRef, useState } from 'react'
import Signup from './Signup'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ToastContainer } from 'react-toastify'
import Signin from './Signin'
import { setSignin, setSignup, logOut } from '../../redux/slices/config'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { signin, signup, token, userName } = useSelector((state: RootState) => state.config)
  const [modal, setModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // clicking outside the modal closes the modal
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModal(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  const logout = () => {
    setModal(false)
    dispatch(logOut())
    navigate("/")
  }

  return (
    <>
      <div className='shadow shadow-white'>
        <div className='max-sm:px-2 py-4 flex justify-between items-center container mx-auto'>
          <h3 onClick={() => navigate("/")} className='text-3xl max-sm:text-2xl tracking-wider font-semibold cursor-pointer'>Rustify</h3>
          <div>
            {
              token ? (
                <div className='cursor-pointer relative flex'>
                  <FontAwesomeIcon onClick={() => navigate("/raid-lock/notifications")} className='mr-6 relative top-0.5' icon={faBell} />
                  <div onClick={() => setModal(true)}>
                    {userName}
                    <FontAwesomeIcon className={modal ? 'text-sm text-white/80 ml-1 transition-transform rotate-180' : 'text-sm transition-transform text-white/80 ml-1'} icon={faAngleDown} />
                  </div>
                  {
                    modal ? (
                      <div ref={modalRef} className='absolute top-0 right-0'>
                        <div onClick={() => setModal(false)} className='h-10 bg-inherit'></div>
                        <div onClick={logout} className='px-4 py-1 bg-slate-600 hover:bg-slate-700'>
                          Logout
                        </div>
                      </div>
                    ) : ''
                  }
                </div>
              ) : (
                <>
                  <button onClick={() => dispatch(setSignup(true))} className='bg-[#16a34a] px-8 py-1 max-sm:px-6 tracking-wider font-medium rounded mr-5 max-sm:text-sm'>Sign Up</button>
                  <button onClick={() => dispatch(setSignin(true))} className='bg-[#0ea5e9] px-8 py-1 max-sm:px-6 tracking-wider font-medium rounded max-sm:text-sm'>Log In</button>
                </>
              )
            }
          </div>
        </div>
      </div>
      {signup ? <Signup /> : ''}
      {signin ? <Signin /> : ''}


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
