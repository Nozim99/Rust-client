import { faUser, faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { setToken } from "../../redux/slices/config";
import { useDispatch } from "react-redux";
import React, { useState } from "react"
import axios from "axios";
import { URLS } from "../../services/URLS";
import { Toast } from "../../services/toast";
import { setSignin, setSignup, setUserName } from "../../redux/slices/config";

export default function Signin() {
  const dispatch = useDispatch()

  const ref = React.createRef<HTMLInputElement>()

  // Class for errors   == border-red-500
  const [nameC, setNameC] = useState("border-inherit")
  const [passwordC, setPasswordC] = useState("border-inherit")

  // Sending data to the server
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  // go to the signup page
  const createAccount = () => {
    dispatch(setSignin(false))
    setNameC("border-inherit")
    setPasswordC("border-inherit")
    setName("")
    setPassword("")
    dispatch(setSignup(true))
  }

  // Signin
  const signin = () => {
    if (name && password) {
      axios.post(URLS.start + URLS.signin, {
        name,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res: { data: { token: string, name: string, userId: string } }) => {
          dispatch(setToken(res.data.token))
          dispatch(setUserName(res.data.name))
          Toast.success("Welcome back to Rustify")
          dispatch(setSignin(false))
        })
        .catch(err => {
          if (err.response.data.error) Toast.error(err.response.data.error)
          console.error(err)
        })
    } else {
      if (!name) setNameC("border-red-500")
      if (!password) setPasswordC("border-red-500")
    }

  }

  return (
    <>
      <div onClick={() => dispatch(setSignin(false))} className="fixed w-full h-full backdrop-blur-sm bg-black/10 top-0 z-10"></div>
      <div className="bg-[#64748b] text-center flex flex-col window_center_flex pt-4 pb-8 px-10 rounded z-20">
        <h1 className="text-3xl font-bold tracking-wide mb-5">Sign in</h1>
        <FontAwesomeIcon onClick={() => dispatch(setSignin(false))} className="absolute top-1 right-2 text-color text-slate-300 cursor-pointer" icon={faXmark} />

        <div className="relative mb-8">
          <input onKeyDown={e => { if (e.key === "Enter" && ref.current) ref.current.focus() }} onChange={(e) => { setName(String(e.target.value)); setNameC("border-inherit") }} required className={"border login outline-none text-black py-1 px-4 rounded w-80 " + nameC} type="text" id="name" />
          <div className="login_input_name absolute font-semibold text-stone-600 pointer-events-none"><FontAwesomeIcon className="" icon={faUser} /> Username</div>
        </div>

        <div className="relative mb-8">
          <input onKeyDown={e => { if (e.key === "Enter") signin() }} ref={ref} onChange={e => { setPassword(String(e.target.value)); setPasswordC("border-inherit") }} required className={"border login outline-none text-black py-1 px-4 rounded w-80  " + passwordC} type="password" id="password" />
          <div className="login_input_name absolute font-semibold text-stone-600 pointer-events-none"><FontAwesomeIcon className="" icon={faLock} /> Password</div>
        </div>

        <button onClick={signin} className="w-full bg-[#16A34A] p-1 rounded">Send</button>

        <div className="text-slate-200 text-sm text-end mt-1">
          I don't have account. <span onClick={createAccount} className="underline text-white cursor-pointer">Create account</span>
        </div>
      </div>
    </>
  )
}