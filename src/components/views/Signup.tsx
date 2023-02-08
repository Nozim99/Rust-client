import { faUser, faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSignin, setSignup, setToken, setUserName } from "../../redux/slices/config";
import { useDispatch } from "react-redux";
import React, { useRef, useState } from "react"
import axios from "axios";
import { URLS } from "../../services/URLS";
import { Toast } from "../../services/toast";

export default function Signup() {
  const dispatch = useDispatch()

  // Class for errors   == border-red-500
  const [nameC, setNameC] = useState("border-inherit")
  const [passwordC, setPasswordC] = useState("border-inherit")
  const [confirmPasswordC, setConfirmPasswordC] = useState("border-inherit")

  // Sending data to the server
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const ref = React.createRef<HTMLInputElement>()
  const confirmRef = React.createRef<HTMLInputElement>()

  const loginAcc = () => {
    dispatch(setSignup(false))
    setNameC("border-inherit")
    setPassword("border-inherit")
    setConfirmPasswordC("border-inherit")
    setName("")
    setPassword("")
    setConfirmPassword("")
    dispatch(setSignin(true))
  }

  // SIGNIN
  const signup = () => {
    if (!name) {
      setNameC("border-red-500")
    } else if (!password) {
      console.log("no password");
      setPasswordC("border-red-500")
    } else if (password !== confirmPassword) {
      setConfirmPasswordC("border-red-500")
    } else {
      axios.post(URLS.start + URLS.signup, {
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
          Toast.success("Welcome to Rustify")
          dispatch(setSignup(false))
        })
        .catch(err => {
          if (err.response.data.error) Toast.error(err.response.data.error)
          console.error(err)
        })
    }
  }

  return (
    <>
      <div onClick={() => dispatch(setSignup(false))} className="fixed w-full h-full backdrop-blur-sm bg-black/10 top-0 z-10"></div>
      <div className="bg-[#64748b] text-center flex flex-col window_center_flex pt-4 pb-8 px-10 rounded z-20">
        <h1 className="text-3xl font-bold tracking-wide mb-5">Sign up</h1>
        <FontAwesomeIcon onClick={() => dispatch(setSignup(false))} className="absolute top-1 right-2 text-color text-slate-300 cursor-pointer" icon={faXmark} />

        <div className="relative mb-8">
          <input onKeyDown={(e) => { if (e.key === "Enter" && ref.current) { ref.current.focus() } }} onChange={(e) => { setName(String(e.target.value)); setNameC("border-inherit") }} required className={"border login outline-none text-black py-1 px-4 rounded w-80 " + nameC} type="text" id="name" />
          <div className="login_input_name absolute font-semibold text-stone-600 pointer-events-none"><FontAwesomeIcon className="" icon={faUser} /> Username</div>
        </div>

        <div className="relative mb-8">
          <input onKeyDown={e => { if (e.key === "Enter" && confirmRef.current) confirmRef.current.focus() }} ref={ref} onChange={e => { setPassword(String(e.target.value)); setPasswordC("border-inherit") }} required className={"border login outline-none text-black py-1 px-4 rounded w-80  " + passwordC} type="password" id="password" />
          <div className="login_input_name absolute font-semibold text-stone-600 pointer-events-none"><FontAwesomeIcon className="" icon={faLock} /> Password</div>
        </div>

        <div className="relative mb-8">
          <input onKeyDown={e => { if (e.key === "Enter") signup() }} ref={confirmRef} onChange={e => { setConfirmPassword(String(e.target.value)); setConfirmPasswordC("border-inherit") }} required className={"border login outline-none text-black py-1 px-4 rounded w-80 " + confirmPasswordC} type="password" id="confirm-password" />
          <div className="login_input_name absolute font-semibold text-stone-600 pointer-events-none"><FontAwesomeIcon className="" icon={faLock} /> Confirm password</div>
        </div>

        <button onClick={signup} className="w-full bg-[#16A34A] p-1 rounded">Send</button>

        <div className="text-slate-200 text-sm text-end mt-1">
          I have already <span onClick={loginAcc} className="underline text-white cursor-pointer">account</span>
        </div>
      </div>
    </>
  )
}