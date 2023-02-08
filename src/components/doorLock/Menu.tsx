import { faBars, faCalendarDays, faChessBishop, faChessPawn, faCrown, faFileLines, faTrash, faUser, faUserGroup, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URLS } from '../../services/URLS'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../../services/toast'

interface Members {
  _id: {
    _id: string;
    name: string;
  };
  status: "player" | "leader";
  codes: {
    index: number;
    code: string;
    _id?: string;
  }[]
}

interface Owner {
  name: {
    _id: string;
    name: string;
  };
  codes: {
    index: number;
    code: string;
    _id?: string
  }[]
}

interface Result {
  owner: {
    codes: {
      code: string;
      index: number;
      _id: string;
    }[];
    name: {
      name: string;
      _id: string;
    }
  }
  members: {
    codes: {
      code: string;
      index: number;
      _id: string;
    }[];
    status: "player" | "leader";
    _id: {
      _id: string;
      name: string;
    }
  }[];
}

interface ResultStatus {
  data: {
    members: {
      _id: {
        _id: string;
        name: string;
      };
      status: "leader" | "player";
      codes: {
        index: number;
        code: string;
        _id: string;
      }[]
    }[]
  }
}

export default function Menu() {
  const navigate = useNavigate()

  const { token, groupId, groupName, userName } = useSelector((state: RootState) => state.config)
  const [members, setMembers] = useState<Members[]>([])
  const [owner, setOwner] = useState<Owner>()
  const [modal, setModal] = useState('')
  const [status, setStatus] = useState<"player" | "leader" | "owner">("player")
  const [deleteModal, setDeleteModal] = useState(false)
  const [codes, setCodes] = useState<{ code: string; index: number; _id?: string }[]>()

  useEffect(() => {
    axios.get(URLS.start + URLS.getGroupMembers + groupId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result: { data: Result }) => {
        setOwner(result.data.owner)
        setMembers(result.data.members)
        for (let i of result.data.members) {
          if (i._id.name.toLowerCase() === userName?.toLowerCase()) {
            setStatus(i.status);
            break;
          }
        }
        if (result.data.owner.name.name.toLowerCase() === userName?.toLowerCase()) {
          setStatus("owner")
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const deletePlayer = (id: string) => {
    axios.delete(URLS.start + URLS.deletePlayer, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        playerID: id,
        groupID: groupId
      }
    })
      .then((result: ResultStatus) => {
        setMembers(result.data.members)
      })
      .catch(error => {
        if (error.responsive && error.responsive.data && error.responsive.data.error) {
          Toast.error(error.responsive.data.error)
        }
        console.error(error)
      })
  }

  const deleteGroup = () => {
    axios.delete(URLS.start + URLS.deleteGroup + `?groupId=${groupId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(() => {
        navigate("/raid-lock/groups")
      })
      .catch(error => {
        if (error.response.data.error && error.response.data.error && error.response.data.error) {
          Toast.error(error.response.data.error)
        }
        console.error(error)
      })
  }

  const changeStatus = (id: string, statusName: "leader" | "player") => {
    axios.put(URLS.start + URLS.status, {
      userId: id,
      groupId: groupId,
      status: statusName
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((result: ResultStatus) => {
        setMembers(result.data.members)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='container mx-auto'>
      <h3 className='text-3xl mt-10 max-sm:ml-2 max-sm:text-2xl'>{groupName}</h3>
      <div className='flex justify-between items-center mt-4'>
        <div><span><FontAwesomeIcon className='text-sm relative bottom-0.5 max-sm:ml-2' icon={faUserGroup} /> {members.length + 1}</span></div>
        <div className='flex'>
          {
            status === "owner" ? (
              <>
                <button onClick={() => navigate("find-user")} className='bg-green-600 hover:bg-green-500 px-6 py-1.5 rounded flex items-center mr-6 max-sm:text-sm max-sm:px-3 max-sm:py-1'><FontAwesomeIcon className='text-sm mr-2' icon={faUserPlus} /> <span>Add player</span></button>
                <button onClick={() => setDeleteModal(true)} className='bg-red-700 hover:bg-red-600 px-6 py-1.5 rounded flex items-center max-sm:text-sm max-sm:px-3 max-sm:py-1 max-sm:mr-2'><FontAwesomeIcon className='text-sm mr-2' icon={faTrash} /> <span>Delete</span></button>
              </>
            ) : ''
          }
          {
            status === "leader" ? <button onClick={() => navigate("find-user")} className='bg-green-600 hover:bg-green-500 px-6 py-1.5 rounded flex items-center mr-6'><FontAwesomeIcon className='text-sm mr-2' icon={faUserPlus} /> <span>Add player</span></button> : ''
          }
        </div>
      </div>

      <div className='mt-7'>
        {
          owner ? (
            <div className='flex justify-between py-5 px-3 bg-slate-900 border border-slate-700 hover:border-slate-500'>
              <div className='w-6/12'>{owner.name.name}</div>
              <div className='w-1/12'>{owner.codes.length}</div>
              <div className='w-2/12'><FontAwesomeIcon className='text-amber-400 text-lg mr-1' icon={faCrown} /> <span className='text-slate-300 max-sm:hidden'>Owner</span></div>
              <div className='relative'>
                <FontAwesomeIcon className='cursor-pointer' onClick={() => setModal("owner")} icon={faBars} />
                {
                  modal === "owner" ? (
                    <>
                      <div onClick={() => setModal('')} className='fixed w-screen h-screen top-0 left-0 z-10'></div>
                      <div className='absolute top-0 right-0 flex bg-slate-700 z-20'>
                        <div onClick={() => { setCodes(owner.codes); setModal("") }} className='flex items-center px-5 py-1 cursor-pointer hover:bg-slate-500'>
                          <FontAwesomeIcon className='mr-5' icon={faFileLines} />  <span className='tracking-widest font-semibold'>Codes</span>
                        </div>
                      </div>
                    </>
                  ) : ""
                }
              </div>
            </div>
          ) : ""
        }

        {
          members ? (
            members.length ? (
              members.map((item, index) => (
                <div key={index} className='flex justify-between py-5 px-3 bg-slate-900 border border-slate-700 hover:border-slate-500'>
                  <div className='w-6/12'>{item._id.name}</div>
                  <div className='w-1/12'>{item.codes.length}</div>
                  {
                    item.status === "player" ? <div className='w-2/12'><FontAwesomeIcon className='text-amber-400 text-cyan-400 text-lg mr-1' icon={faChessPawn} /> <span className='text-slate-300 max-sm:hidden'>Player</span></div> : <div className='w-2/12'><FontAwesomeIcon className='text-green-500 text-green-500 text-lg mr-1' icon={faChessBishop} /> <span className='text-slate-300 max-sm:hidden'>Lider</span></div>
                  }
                  <div className='relative'>
                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setModal(item._id._id)} icon={faBars} />
                    {
                      modal === item._id._id ? (
                        <>
                          <div onClick={() => setModal('')} className='fixed w-screen h-screen top-0 left-0 '></div>
                          <ul className='absolute top-0 right-0 bg-slate-700'>
                            <li onClick={() => { setCodes(item.codes); setModal("") }} className='cursor-pointer px-8 pb-1 pt-2 hover:bg-slate-500 flex'><FontAwesomeIcon className='mr-4' icon={faFileLines} /> <span className='tracking-widest font-semibold'>Codes</span></li>
                            {
                              status === "owner" ? (
                                <>
                                  <li onClick={() => { changeStatus(item._id._id, "leader"); setModal("") }} className='cursor-pointer px-8 py-1 flex items-center text-green-500 hover:bg-slate-500'><FontAwesomeIcon className='mr-5' icon={faChessBishop} /> <span className='tracking-widest font-semibold'>Lider</span></li>
                                  <li onClick={() => { changeStatus(item._id._id, "player"); setModal("") }} className='cursor-pointer px-8 py-1 flex items-center text-cyan-400 hover:bg-slate-500'><FontAwesomeIcon className='mr-5' icon={faChessPawn} /> <span className='tracking-widest font-semibold'>Player</span></li>
                                  <li onClick={() => { deletePlayer(item._id._id); setModal("") }} className='cursor-pointer px-8 pt-1 pb-2 flex items-center text-red-500 hover:bg-slate-500'><FontAwesomeIcon className='mr-5' icon={faTrash} /> <span className='tracking-widest font-semibold'>Delete</span></li>
                                </>
                              ) : ''
                            }
                            {
                              status === "leader" ? (item.status === "player" ? (
                                <li onClick={() => { deletePlayer(item._id._id); setModal("") }} className='cursor-pointer px-8 pt-1 pb-2 flex items-center text-red-500 hover:bg-slate-500'><FontAwesomeIcon className='mr-5' icon={faTrash} /> <span className='tracking-widest font-semibold'>Delete</span></li>
                              ) : "") : ""
                            }
                          </ul>
                        </>
                      ) : ''
                    }
                  </div>
                </div>
              ))
            ) : ''
          ) : ""
        }

      </div>
      {
        deleteModal ? (
          <>
            <div onClick={() => setDeleteModal(false)} className='fixed top-0 left-0 bg-slate-300/10 w-screen h-screen back_drop'></div>
            <div className='window_center_fixed bg-slate-900/60 px-10 pt-4 pb-6'>
              <div className='mb-6 text-lg tracking-wide text-center'>Delete group <span className='font-semibold'>{groupName ? groupName.length >= 30 ? groupName?.slice(0, 30) + "..." : groupName : ""}</span></div>
              <div className='flex justify-center'>
                <button onClick={() => setDeleteModal(false)} className='bg-slate-600 hover:bg-slate-700 w-28 py-1 mr-4 rounded tracking-wide'>Close</button>
                <button onClick={deleteGroup} className='bg-white/10 w-28 py-1 rounded bg-red-600 hover:bg-red-700 tracking-wide'>Delete</button>
              </div>
            </div>
          </>
        ) : ""
      }
      {
        codes ? (
          <>
            <div onClick={() => setCodes(undefined)} className='w-screen h-screen fixed bg-slate-300/10 top-0 left-0 back_drop'></div>
            <div className='w-60 bg-gray-800 window_center_fixed pt-6'>
              <div onClick={() => setCodes(undefined)} className='absolute top-0 right-2 text-slate-300 cursor-pointer text-lg'><FontAwesomeIcon icon={faXmark} /></div>
              <div className='border-b mx-1 flex'><span className='text-gray-300 w-2/6 inline-block ml-4 font-semibold'>№</span>   <span className='font-semibold tracking-wide w-4/6 inline-block text-gray-300 ml-3'>Code</span></div>
              <ul className='overflow-auto height_100 mt-2 numbers_scrollbar numbers_scrollbar_codes'>
                {
                  codes.slice().reverse().map(item => (
                    <li key={item._id} className='border-b mx-1 flex mt-2 border-gray-400'><span className='text-slate-200 w-2/6 inline-block ml-4'>{item.index}</span>   <span className='font-semibold tracking-wide w-4/6 inline-block ml-3'>{item.code}</span></li>
                  ))
                }
              </ul>
            </div>
          </>
        ) : ""
      }
    </div>
  )
}
