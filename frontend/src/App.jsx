import { Navigate, Route, Routes,useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"

import Signupage from "./pages/signupage.jsx"
import Loginpage from "./pages/loginpage.jsx"
import Homepage from "./pages/homepage.jsx"
import Verificationpage from "./pages/verificationpage.jsx"
import Forgetpage from "./pages/forgetpage.jsx"
import Resetpassword from "./pages/resetpassword.jsx"

function App() {

  const{checkAuth,isAuthenticated,user ,isLoading} = useAuthStore();
  const location = useLocation();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  // the old loader caused error while updating state in forget password so this:
  if(isLoading && location.pathname !== '/forget-password'){
    return <Loader className="animate-spin mx-auto size-10 text-purple-700"/>
}

  return (
    <>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Homepage/> : <Navigate to="/login"/>}/> 
        <Route path="/signup" element={!isAuthenticated ? <Signupage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!isAuthenticated ? <Loginpage/> : <Navigate to="/"/>}/>
        <Route path="/forget-password" element={!isAuthenticated ? <Forgetpage/> : <Navigate to='/'/> }/>
        <Route path="/reset-password/:token" element={!isAuthenticated ? <Resetpassword/> : <Navigate to='/'/>}/>
        <Route path="/verify-email" element={<Verificationpage/>}/>  
       <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
