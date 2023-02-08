import React, { useEffect } from 'react'
import DoorLock from './views/DoorLock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { URLS } from '../../services/URLS'
import { setCodes } from '../../redux/slices/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Group() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { codes } = useSelector((state: RootState) => state.data)
  const { groupId, token, groupName } = useSelector((state: RootState) => state.config)

  useEffect(() => {
    axios.get(URLS.start + URLS.getArchiveCodes + groupId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      dispatch(setCodes(result.data.codes))
    })
  }, [])

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center max-sm:mx-2'>
        <h3 className='mt-6 mb-8 text-3xl tracking-wide font-medium max-sm:text-2xl'>{groupName}</h3>
        <button onClick={() => navigate("menu")} className='flex items-center py-1.5 px-6 bg-green-600 hover:bg-green-500 rounded-sm max-sm:text-sm'>Menu <FontAwesomeIcon className='text-sm ml-2' icon={faBars} /></button>
      </div>
      <div className='flex justify-center'>
        <DoorLock forGroup={true} />
        <div className='w-40 bg-black border border-slate-500 relative'>
          <ul className='pt-3 overflow-auto h-72 border-b-2 border-slate-500 numbers_scrollbar'>
            {
              codes ? (
                codes.slice().reverse().map((item, index) => {
                  return <li className='flex justify-between items-center' key={item.index}><span className='ml-2 text-white/60 text-sm'>{item.index}</span> <span className='mr-11'>{item.code}</span></li>
                })
              ) : ''
            }
          </ul>
          <div className='text-center mt-2.5'>{codes ? codes.length : ''}</div>
        </div>
      </div>
    </div>
  )
}
