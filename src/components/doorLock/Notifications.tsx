import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URLS } from '../../services/URLS';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Toast } from '../../services/toast';
import LdsRoller from '../extra/LdsRoller';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  const { token } = useSelector((state: RootState) => state.config)
  const [data, setData] = useState<Data[] | null>()

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

  const deny = (id: string) => {
    axios.delete(URLS.start + URLS.denyNotification + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(result => {
        setData(result.data)
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          Toast.error(error.response.data.error)
        }
        console.error(error)
      })
  }

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!token) {
      navigate("/")
    } else {
      getData()
      interval = setInterval(() => {
        getData()
      }, 1000)
    }

    return () => clearInterval(interval as NodeJS.Timeout)
  }, [])

  return (
    <div className='container mx-auto'>
      <h3 className='text-2xl font-medium tracking-wider mt-8 max-sm:text-xl ml-2'>Notifications</h3>
      <ul className='mt-6 flex ml-2'>
        {
          data ? (
            data.length ? (
              data.map((item, index) => (
                <li key={index}>
                  <button onClick={() => deny(item.groupId._id)} className='bg-red-600 font-medium tracking-wider px-6 py-0.5 mr-3 max-sm:text-sm max-sm:px-4'>Deny</button>
                  <button onClick={() => allow(item.groupId._id, item.groupId.name)} className='bg-green-600 font-medium tracking-wider px-6 py-0.5 mr-10 max-sm:text-sm max-sm:px-4 max-sm:mr-6'>Allow</button>
                  <span className='py-0.5 mr-5 font-semibold text-lg text-slate-300 tracking-wider max-sm:text-base max-sm:mr-3'>{item.notificationBy.name}</span>
                  <span className='py-0.5 font-semibold text-lg tracking-wider max-sm:text-base'>{item.groupId.name}</span>
                </li>
              ))
            ) : <h3 className='text-lg tracking-wider font-medium text-slate-300 max-sm:text-base'>No notification!</h3>
          ) : <LdsRoller />
        }
      </ul>
    </div>
  )
}
