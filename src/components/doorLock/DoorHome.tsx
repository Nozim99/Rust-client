import React from 'react'
import DoorLock from './views/DoorLock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setSignup } from '../../redux/slices/config'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function DoorHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { tryYourself } = useSelector((state: RootState) => state.data)
  const { token } = useSelector((state: RootState) => state.config)

  // Go to Group page
  const goGroup = () => {
    if (token) {
      navigate("/raid-lock/groups")
    } else {
      dispatch(setSignup(true))
    }
  }

  return (
    <div className='container mx-auto pt-7 text-center'>
      <div className='flex items-center justify-between mb-10 max-sm:mx-2'>
        <h3 className='text-2xl font-semibold text-start'>Try yourself</h3>
        <button onClick={goGroup} className='bg-[#16A34A] py-1.5 px-7 rounded tracking-wide max-sm:text-sm' >Groups</button>
      </div>
      <h3 className='mb-3'>Top 10.000 RUST door lock codes</h3>
      <div className='flex justify-center'>
        <DoorLock />
        <div className='w-40 bg-black border border-slate-500 relative'>
          <ul className='pt-3 overflow-auto h-72 border-b-2 border-slate-500 numbers_scrollbar'>
            {
              tryYourself.numbers.slice().reverse().map((item, index) => {
                return <li className='flex justify-between items-center' key={item}><span className='ml-2 text-white/60 text-sm'>{tryYourself.numbers.indexOf(item) + 1}</span> <span className='mr-11'>{item}</span></li>
              })
            }
          </ul>
          <div className='text-center mt-2.5'>{tryYourself.numbers.length}</div>
        </div>
      </div>
      {/* <button className='py-1.5 shadow shadow-white/20 hover:bg-[#7f1d1d] rounded w-96 mt-4 bg-white/10'><FontAwesomeIcon icon={faRotate} /> Restart</button> */}
    </div>
  )
}
