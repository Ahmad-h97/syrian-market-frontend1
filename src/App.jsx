import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import LogIn from './pages/LogIn'
import LogOut from './pages/LogOut'
import VerifyEmail from './pages/VerifyEmail'
import PostHouse from './pages/PostHouse'
import Profile from './pages/Profile'
import EditHouse from './pages/EditHouse'
import House from './pages/House'
import AppLayout from './components/AppLayout'
import './App.css';



function App(){
  return(
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<LogIn/>}/>
        <Route path="/logout" element={<LogOut/>}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/post-house" element={<PostHouse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-house/:houseId" element={<EditHouse />} />
        <Route path="/house/:houseId" element={<House />} />
      </Route>
    </Routes>
  )
}
export default App