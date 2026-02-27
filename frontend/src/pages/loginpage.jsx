import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Loader, Lock, Mail} from 'lucide-react';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

import Input from '../components/inputs.jsx';
import { useAuthStore } from '../store/authStore.js';

const Loginpage = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState();
  const[password,setPassword] = useState();

  const {login,isLoading,error} = useAuthStore()


  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      login(email,password) 
      toast.success("Logged in successfully!")
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error(`${error}`)
    }
  }
  return (
        <div className=" p-8 bg-white tex rounded-2xl shadow-lg drop-shadow-md w-87">
          <h1 className=' text-3xl font-bold mb-6 text-center'>
             Welcome Back 🎉
          </h1>
          <form onSubmit={handleLogin}>
            <Input
            icon={Mail}
            type="text"
            placeholder="youremail.com"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <div>
              <Link to={"/forget-password"} className='text-purple-900 text-sm hover:underline'>
                Forget Password?
              </Link>
            </div>
    
            <motion.button className='mt-5 w-full py-3 px-4 text-purple-900 
              font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:ring-offset-2
              focus:ring-offset-gray-900 transition duration-200'
              style={{background: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'}}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              >{isLoading ? <Loader className=' animate-spin mx-auto' /> : "log in"}
            </motion.button>
    
          </form>
          <div className='px-8 py-4 flex justify-center'>
              <p>
                Don't have an account?
              </p>
              <Link to={"/signup"} className=' text-purple-800'>
                SignUp
              </Link>
    
          </div>
        </div>
  )
}

export default Loginpage
