import { faCalendarDays, faChessBishop, faChessPawn, faCircleUser, faCrown, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { URLS } from '../../services/URLS'
import { useDispatch } from 'react-redux'
import { setGroups, setMyGroups, addMyGroups } from '../../redux/slices/data'
import { setGroupId, setGroupName } from '../../redux/slices/config'
import { Toast } from '../../services/toast'


export default function Groups() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token, userName } = useSelector((state: RootState) => state.config)
  const { groups, myGroups } = useSelector((state: RootState) => state.data)

  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [nameC, setNameC] = useState("border-white")

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && name.length > 3) {
      axios.post(URLS.start + URLS.createGroup, {
        name
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(result => {
          console.log(result)
          dispatch(addMyGroups([result.data.group, userName]))
          setModal(false)
        }).catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            Toast.error(error.response.data.error)
            setModal(false)
          }
          console.error(error)
        })
    } else {
      setNameC("border-red-500")
    }
  }

  useEffect(() => {
    if (!token) navigate("/raid-lock")

    axios.get<{ myGroup: [], otherGroup: [] }>(URLS.start + URLS.getGroups, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      dispatch(setMyGroups(result.data.myGroup))
      dispatch(setGroups(result.data.otherGroup))
    })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const pageGroup = (id: string, name: string) => {
    navigate("group")
    dispatch(setGroupId(id))
    dispatch(setGroupName(name))
  }

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between mt-8 items-center max-sm:px-2'>
        <h3 className='text-2xl max-sm:text-xl font-semibold tracking-wide'>Groups list</h3>
        <button onClick={() => setModal(true)} className='max-md:text-sm bg-[#16A34A] py-1.5 px-5 rounded'>Create group</button>
      </div>

      <div className='mt-10'>
        {
          [...myGroups, ...groups].length ? (
            <>
              {
                myGroups.length ? (
                  myGroups.map(item => {
                    return (
                      <div onClick={() => pageGroup(item._id, item.name)} key={item.name} className='border border-slate-500 flex justify-between bg-slate-900 hover:bg-slate-800 py-5 px-5 font-semibold tracking-wide text-lg max-sm:text-sm items-center cursor-pointer relative'>
                        <div className='w-4/12'>{item.name} <FontAwesomeIcon className='absolute top-1 left-2 text-sm text-amber-400' icon={faCrown} /></div>
                        <div className='w-3/12'>{item.createdBy.name}</div>
                        <div className='flex items-center w-1/12 max-sm:w-2/12'>{item.members.length + 1} <FontAwesomeIcon className='text-sm ml-1 text-slate-200 ' icon={faUserGroup} /></div>
                        <div className='flex items-center w-3/12 max-sm:hidden max-lg:text-sm'>{new Date(item.createdAt).toLocaleDateString("ru-RU")} <FontAwesomeIcon className='text-sm text-slate-200 ml-1 max-md:hidden' icon={faCalendarDays} /></div>
                        <div className='w-1/12 max-sm:w-2/12 max-md:text-sm'>{(item.count / 100).toFixed(2)} %</div>
                      </div>
                    )
                  })
                ) : ""
              }

              {
                groups.length ? (
                  groups.map(item => {
                    return (
                      <div onClick={() => pageGroup(item._id, item.name)} key={item.name} className='max-sm:text-xs relative border border-slate-500 flex justify-between bg-slate-900 hover:bg-slate-800 py-5 px-5 font-semibold tracking-wide text-lg max-sm:text-sm items-center cursor-pointer'>
                        <div className='w-4/12'>{item.name} {item.status === "player" ? <FontAwesomeIcon className='absolute top-1 left-2 text-sm text-cyan-400' icon={faChessPawn} /> : <FontAwesomeIcon className='absolute top-1 left-2 text-sm text-green-500' icon={faChessBishop} />} </div>
                        <div className='w-4/12'>{item.createdBy.name}</div>
                        <div className='flex items-center w-1/12 max-sm:w-2/12'>{item.members.length + 1} <FontAwesomeIcon className='text-sm ml-1 text-slate-200' icon={faUserGroup} /></div>
                        <div className='flex items-center w-2/12 max-sm:hidden max-lg:text-sm'>{new Date(item.createdAt).toLocaleDateString("ru-RU")} <FontAwesomeIcon className='text-sm text-slate-200 ml-1 max-md:hidden' icon={faCalendarDays} /></div>
                        <div className='w-1/12 max-sm:w-2/12 max-md:text-sm'>{(item.count / 100).toFixed(2)} %</div>
                      </div>
                    )
                  })

                ) : ""
              }
            </>
          ) : <h3>There is no group</h3>
        }

      </div>

      {modal ? (
        <div>
          <div onClick={() => setModal(false)} className='fixed w-screen h-screen top-0 right-0 bg-white/10'></div>
          <form className='window_center_flex bg-gray-800 pb-10 rounded border border-white/30' onSubmit={send}>

            <h3 className='text-2xl font-semibold mb-5 text-center pt-7 relative'>Create Group <FontAwesomeIcon onClick={() => setModal(false)} className='absolute top-1 right-2 text-slate-400 cursor-pointer' icon={faXmark} /></h3>
            <div className='w-80 relative mx-20'>
              <input required className={'login text-black w-full outline-none px-2 py-1 rounded border-2 ' + nameC} onChange={e => { setName(e.target.value); setNameC('border-white') }} type="text" />
              <div className='absolute login_input_name text-black pointer-events-none'>Group name</div>
            </div>
            <div className='mx-20 '>
              <button type='submit' className='w-full bg-green-600 mt-6 py-1 rounded hover:bg-green-700'>create</button>
            </div>
          </form>
        </div>
      ) : ""}
    </div>
  )
}
