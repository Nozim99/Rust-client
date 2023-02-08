import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URLS } from '../../services/URLS'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Toast } from '../../services/toast'

interface Data {
  notification: string[];
  _id: string;
  name: string;
  __v?: number
}

export default function FindUser() {
  const { token, groupId } = useSelector((state: RootState) => state.config)
  const [name, setName] = useState("")
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    axios.get(URLS.start + URLS.getUsers + `?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        setData(result.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [name])

  const send = (id: string) => {
    axios.put(URLS.start + URLS.addPlayer, {
      player: id,
      group: groupId
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(result => {
        Toast.success(result.data.message)
      })
      .catch(error => {
        if (error.response.data && error.response.data.error) {
          Toast.error(error.response.data.error)
        }
        console.error(error)
      })
  }

  return (
    <div className='container mx-auto'>
      <div className='text-center mt-8'>
        <input onChange={e => setName(e.target.value)} className='px-5 py-0.5 outline-none text-slate-600 tracking-wide rounded-2xl w-80' type="text" placeholder='Name' />
      </div>
      <ul className='mt-5'>
        {
          data.map(item => (
            <li className='my-2 ml-4' key={item.name}><FontAwesomeIcon onClick={() => send(item._id)} className='mr-3 text-green-500 cursor-pointer' icon={faUserPlus} /> <span className='cursor-default'>{item.name}</span></li>
          ))
        }
      </ul>
    </div>
  )
}
