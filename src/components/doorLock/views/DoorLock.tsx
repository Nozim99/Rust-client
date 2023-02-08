import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { URLS } from '../../../services/URLS'
import axios from 'axios'
import Loading from '../../extra/Loading'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addTryYourself, setCodes } from '../../../redux/slices/data'
import { useDispatch } from 'react-redux'

export default function DoorLock(props: { forGroup?: boolean }) {
  const dispatch = useDispatch()

  const [num, setNum] = useState("****")
  const [load, setLoad] = useState(false)

  const { tryYourself } = useSelector((state: RootState) => state.data)
  const { groupId, token } = useSelector((state: RootState) => state.config)

  // get number from server
  const getNum = () => {
    if (props.forGroup) {
      if (!load) {
        setLoad(true)
        axios.get(URLS.start + URLS.getNumInGroup + groupId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            setNum(res.data.number)
            dispatch(setCodes(res.data.codes))
            setLoad(false)
          })
          .catch(err => {
            console.error(err)
          })
      }
    } else {
      if (!load) {
        setLoad(true)
        axios.get(URLS.start + URLS.getNum + tryYourself.count)
          .then(res => {
            setNum(res.data.number)
            dispatch(addTryYourself(res.data.number))
            setLoad(false)
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }

  // Run the getNum function when Enter is pressed
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       e.stopPropagation()
  //       getNum()
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [])

  return (
    <div className='bg-black border border-slate-500 inline-block px-7 py-6'>
      <h2 className='text-center mb-2 text-xl font-medium'>MASTER CODE</h2>
      <div className='bg-zinc-600 inline-block h-10 relative'>
        {
          load ? (
            <div className='absolute w-full h-full backdrop-blur-sm z-10'>
              <Loading />
            </div>
          ) : ""
        }
        <div className='w-10 h-10 inline-block text-2xl relative'><span className='absolute top-1 left-3'>{num[0]}</span></div>
        <div className='w-10 h-10 inline-block text-2xl relative'><span className='absolute top-1 left-3'>{num[1]}</span></div>
        <div className='w-10 h-10 inline-block text-2xl relative'><span className='absolute top-1 left-3'>{num[2]}</span></div>
        <div className='w-10 h-10 inline-block text-2xl relative'><span className='absolute top-1 left-3'>{num[3]}</span></div>
      </div>
      <ul className='w-40 grid gap-4 grid-cols-3 text-center mt-4'>
        <li className='cursor-pointer border py-1'>7</li>
        <li className='cursor-pointer border py-1'>8</li>
        <li className='cursor-pointer border py-1'>9</li>
        <li className='cursor-pointer border py-1'>4</li>
        <li className='cursor-pointer border py-1'>5</li>
        <li className='cursor-pointer border py-1'>6</li>
        <li className='cursor-pointer border py-1'>1</li>
        <li className='cursor-pointer border py-1'>2</li>
        <li className='cursor-pointer border py-1'>3</li>
        <li className='cursor-pointer border py-1'>0</li>
        <li className='cursor-pointer border py-1'>C</li>
        <li onClick={getNum} className='cursor-pointer border py-1 bg-[#b91c1c]'><FontAwesomeIcon icon={faRightToBracket} /></li>
      </ul>
    </div>
  )
}
