import { useState } from 'react'
import {Loader, Lock, Mail, User} from 'lucide-react'
import { Link ,useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {toast} from 'react-hot-toast'


import Input from '../components/inputs'
import PasswordStrengthMeter from '../components/passwordstrength.jsx'
import { useAuthStore } from '../store/authStore.js'

const Signupage = () => {

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const{signup,error,isLoading} = useAuthStore()

  const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
          await signup(name,email,password);
          navigate("/verify-email")
          toast.success("Signed Up in successfully!")
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <div className=" p-8 bg-white tex rounded-2xl shadow-lg drop-shadow-md w-87">
      <h1 className=' text-3xl font-bold mb-6 text-center'>
         Create Account ✏️
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
        icon={User}
        type="text"
        placeholder="full name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
        />
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
        {error && <p className=' text-red-400 font-semibold mt-2'>{error}</p>}
        <PasswordStrengthMeter password={password}/>
         
        <motion.button className='mt-5 w-full py-3 px-4 text-purple-900 
          font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-offset-2
          focus:ring-offset-gray-900 transition duration-200'
          style={{background: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'}}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isLoading}
          >{isLoading ? <Loader className='animate-spin mx-auto'/> : "sign up"}
        </motion.button>

      </form>
      <div className='px-8 py-4 flex justify-center'>
          <p>
            Already have an account?
          </p>
          <Link to={"/login"} className=' text-purple-800'>
            Login
          </Link>

      </div>
    </div>
  )
}

export default Signupage
