import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import Input from '../components/inputs.jsx';
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotpassword } = useAuthStore();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await forgotpassword(email);
        console.log("about to set submitted, isSubmitted currently:", isSubmitted);
        setIsSubmitted(true);
        console.log("set submitted called");
        

    } catch (error) {
        console.log("error:", error.message);
        console.log("full:", error);
    }
};



	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full  bg-white backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center text-black'>
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-600 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<motion.button
							className='mt-5 w-full py-3 px-4 text-purple-900 
                            font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:ring-offset-2
                            focus:ring-offset-gray-900 transition duration-200'
                            style={{background: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'}}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
						>
							{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
						</motion.button>
					</form>
				) : (
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-gray-500 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}
			</div>

			<div className='px-8 py-4 bg-white flex justify-center'>
				<Link to={"/login"} className='text-sm text-purple-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
		</motion.div>
	);
};
export default ForgotPassword;