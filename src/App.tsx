import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DoorLock from './components/doorLock/views/DoorLock'
import Footer from './components/views/Footer'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/views/Navbar'
import Signup from './components/views/Signup'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import 'react-toastify/dist/ReactToastify.css';
import DoorHome from './components/doorLock/DoorHome'
import Groups from './components/doorLock/Groups'
import Group from './components/doorLock/Group'
import Menu from './components/doorLock/Menu'
import FindUser from './components/doorLock/FindUser'
import Notifications from './components/doorLock/Notifications'

function App() {

  return (
    <div className="App mx-auto">
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<DoorHome />} />
          <Route path='/raid-lock/groups' element={<Groups />} />
          <Route path='/raid-lock/groups/group' element={<Group />} />
          <Route path='/raid-lock/groups/group/menu' element={<Menu />} />
          <Route path='/raid-lock/groups/group/menu/find-user' element={<FindUser />} />
          <Route path='/raid-lock/notifications' element={<Notifications />} />
        </Routes>
        {/* <DoorLock /> */}
        {/* <Footer /> */}
      </Provider>
    </div>
  )
}

export default App