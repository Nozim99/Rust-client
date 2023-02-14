import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/views/Navbar'
import Signup from './components/views/Signup'
import 'react-toastify/dist/ReactToastify.css';
import DoorHome from './components/doorLock/DoorHome'
import Groups from './components/doorLock/Groups'
import Group from './components/doorLock/Group'
import Menu from './components/doorLock/Menu'
import FindUser from './components/doorLock/FindUser'
import Notifications from './components/doorLock/Notifications'
import { useSelector } from 'react-redux'
import PageNotFound from './components/extra/PageNotFound'
import CalcHome from './components/calculator/CalcHome'
import CalcDoor from './components/calculator/CalcDoor'

function App() {

  return (
    <div className="App mx-auto">
      <Navbar />
      <Routes>
        <Route path='/' element={<DoorHome />} />
        <Route path='/raid-lock/groups' element={<Groups />} />
        <Route path='/raid-lock/groups/group' element={<Group />} />
        <Route path='/raid-lock/groups/group/menu' element={<Menu />} />
        <Route path='/raid-lock/groups/group/menu/find-user' element={<FindUser />} />
        <Route path='/raid-lock/notifications' element={<Notifications />} />
        {/* <Route path='/raid' element={<CalcHome />} /> */}
        {/* <Route path='/raid/door' element={<CalcDoor />} /> */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* <DoorLock /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default App
