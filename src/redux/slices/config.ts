import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const configSlice = createSlice({
  name: "config",
  initialState: {
    token: Cookies.get("token"),
    userName: Cookies.get("name"),
    signup: false,
    signin: false,
    groupId: Cookies.get("groupId"),
    groupName: Cookies.get("groupName")
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload
      Cookies.set("token", payload)
    },
    setUserName: (state, { payload }) => {
      state.userName = payload;
      Cookies.set("name", payload)
    },
    logOut: (state) => {
      Cookies.remove("name")
      Cookies.remove("token")
      state.token = undefined
      state.userName = undefined
    },
    setSignup: (state, { payload }) => {
      state.signup = payload
    },
    setSignin: (state, { payload }) => {
      state.signin = payload
    },
    setGroupId: (state, { payload }) => {
      state.groupId = payload
      Cookies.set("groupId", payload)
    },
    setGroupName: (state, { payload }) => {
      state.groupName = payload;
      Cookies.set("groupName", payload)
    }
  }
})

export const { setToken, setSignup, setSignin, setUserName, logOut, setGroupId, setGroupName } = configSlice.actions;
export default configSlice.reducer;