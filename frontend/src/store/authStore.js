import {create} from 'zustand';
import axios from 'axios';


const api = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup:async(name,email,password) =>{
        set({isLoading:true,error:null})
        try {
           const res = await axios.post(`${api}/signup`,{email,name,password});
           set({user: res.data.user,isAuthenticated:true,isLoading:false})
        } catch (error) {
             console.log("full error:", error);
             console.log("error response:", error.response);
            set({error: error.response.data.message|| "error in signup",isLoading:false })
            throw error
        }
    },

    login:async(email,password)=>{
        set({isLoading:true,error:null})
        try {
            const res = await axios.post(`${api}/login`,{email,password})
            set({
                isAuthenticated:true,
                error:null,
                user:res.data.user,
                isLoading:false
            })
        }catch(error) {
            set({error:error.response.data.message || "error in logging in..",isLoading:false})
            throw new error
        }
    },

    logout:async()=>{
        set({isLoading:true})
        try {
           const res = await axios.post(`${api}/logout`)
           set({user:null,isAuthenticated:false,error:null,isLoading:false}) 
        } catch (error) {
            set({error:"error in logging out!",isLoading:false})
            throw new error
            
        }
    },

    verificationEmail:async(code)=>{
        set({isLoading:true})
        try {
        const res = await axios.post(`${api}/verify-email`,{code})
        set({user: res.data.user, isAuthenticated:true,isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in verify email!",isLoading:false})
            throw new error
        }
    },

    checkAuth:async()=>{
        set({isCheckingAuth:true,isLoading:true})
        try {
            const res = await axios.get(`${api}/check-auth`);
            set({user:res.data.user,isAuthenticated:true,isCheckingAuth:false,isLoading:false})
        } catch (error) {
            set({error: null, isCheckingAuth:false,isAuthenticated:false,isLoading:false})
            
        }
    },
    
    forgotpassword:async(email)=>{
        set({isLoading:true,error:null})
        try {
            const res = await axios.post(`${api}/forget-password`,{email})
            set({
                isLoading:false,
            })
        } catch (error) {
            set({
                isLoading:false,
                error:error.response.data.message || "error in sending reset password mail"
            })
            throw  error
        }
    },
    
    resetpassword:async(token,password)=>{
        set({isLoading:true,error:null})
        try {
            const res = await axios.post(`${api}/reset-password/${token}`,{password})
            set({message:res.data.message,isLoading:false,})
        } catch (error) {
            set({
                isLoading:false,
                error:error.response.data.message || "error in reset password"
            })
            throw error
        }
    }
}));
