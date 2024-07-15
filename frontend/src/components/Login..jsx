import React, { useEffect} from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast'
const Login = () => {
    const [authUser, setAuthUser]=useAuth()
       
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();


    
    const submitLoginForm = (data) => {
        const userinfo = {
            
            email: data.email,
            password: data.password,
            


        }
       
        axios.post("https://chat-website-isk6.onrender.com/api/user/login",userinfo)
        
            .then((response) => {
                
                if(response.data){
                
               toast.success("Login Successful")
                }
                localStorage.setItem("Chatapp",JSON.stringify( response.data))
                setAuthUser(response.data )


            })
            .catch((error) => {
                if(error.response){
                    toast.error("Error:"+ error.response.data.error)
                }
               
            })
    };
   
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                
                email: "",
                password: "",
               
               
            });
        }
    }, [reset, isSubmitSuccessful]);





   
    return (
        <div className=' flex justify-center items-center h-[100vh]   '>
            <div className=' min-h-[50vh] min-w-[27vw]   shadow-lg   bg-white   rounded-xl '>
              
                        <div  >
                            <div className=' text-center text-3xl mt-10 font-semibold'>Login</div>

                            <form action="" className='flex flex-col    mt-12 mr-8 ml-8  '
                                onSubmit={handleSubmit(submitLoginForm)} >
                                <label className='  font-semibold'
                                 htmlFor=''>Email <sup className=' text-red-600'>*</sup></label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                                    {...register("email", { required: true })} />
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1">
                                        Please enter your email.
                                    </span>
                                )}

                                <label className=' mt-4 font-semibold' htmlFor=''>Password <sup className=' text-red-600'>*</sup></label>
                                <input type="password"
                                    className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                                    name="password"
                                    id="password"


                                    {...register("password", { required: true })} />
                                {errors.password && (
                                    <span className="text-red-500 text-sm mt-1">
                                        Please enter your Password.
                                    </span>
                                )}
                                <div className=' mt-4 text-blue-500 text-sm'>
                                    <Link to='/ResetPassword'>Forgot Password ?</Link>
                                </div>


                                <button className='mt-9  bg-yellow-400 p-2 rounded-md'>Login</button>

                            </form>

                            <div className='text-black text-center m-3 ' ><span>------</span>OR <span>------</span></div>
                            <Link to='/signup'><div className=' text-blue-500 text-center mr-8 ml-8 mb-5 hover:bg-sky-100 hover:cursor-pointer p-1 transition-all duration-300 ' >Signup</div></Link>


                        </div>
                   


                    
                
            </div>
        </div>
    )
}

export default Login