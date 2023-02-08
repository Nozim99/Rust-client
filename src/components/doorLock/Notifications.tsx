import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URLS } from '../../services/URLS';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Toast } from '../../services/toast';

interface Data {
  groupId: {
    _id: string;
    name: string;
  };
  notificationBy: {
    _id: string;
    name: string;
  };
  _id: string
}

export default function Notifications() {
  const { token } = useSelector((state: RootState) => state.config)
  const [data, setData] = useState<Data[]>([])

  const getData = () => {
    axios.get(URLS.start + URLS.getNotifications, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(result => {
        setData(result.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const allow = (id: string, name: string) => {
    axios.put(URLS.start + URLS.acceptNotification + id, null, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(result => {
        Toast.success(`You have joined the ${name}`)
        setData(result.data)
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          Toast.error(error.response.data.error)
        }
        console.error(error)
      })
  }

  const deny = () => {

  }

  useEffect(() => {
    getData()
    setInterval(() => {
      getData()
    }, 2000)
  }, [])

  return (
    <div className='container mx-auto'>
      <h3 className='text-2xl font-medium tracking-wider mt-8'>Notifications</h3>
      <ul className='mt-6 flex'>
        {
          data.length ? (
            data.map((item, index) => (
              <li key={index}>
                <button className='bg-red-600 font-medium tracking-wider px-6 py-0.5 mr-3'>Deny</button>
                <button onClick={() => allow(item.groupId._id, item.groupId.name)} className='bg-green-600 font-medium tracking-wider px-6 py-0.5 mr-10'>Allow</button>
                <span className='py-0.5 mr-5 font-semibold text-lg text-slate-300 tracking-wider'>{item.notificationBy.name}</span>
                <span className='py-0.5 font-semibold text-lg tracking-wider'>{item.groupId.name}</span>
              </li>
            ))
          ) : <h3 className='text-lg tracking-wider font-medium text-slate-300'>No notification!</h3>
        }
      </ul>
    </div>
  )
}
