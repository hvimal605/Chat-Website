import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [authUser, setAuthUser]=useAuth()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm();


    //watch the password and confirm password field
    const password = watch("password", "");
    const confirmpassword = watch("confirmpassword", "")

    const validatePasswordMatch = (value) => {
        return value === password || "Password do not match"
    }

    const submitSignupForm = async(data) => {
        const userinfo = {
            fullname: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmpassword


        }

        await axios.post("https://chat-website-isk6.onrender.com/api/user/signup", userinfo)
            .then((response) => {
                if(response.data){
                toast.success(" signup successful")
                }
                localStorage.setItem("Chatapp",JSON.stringify( response.data))
                setAuthUser(response.data)


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
                name: "",
                email: "",
                password: "",
                confirmpassword: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div className='flex justify-center items-center h-[100vh] '>
            <div className='min-h-[50vh] min-w-[27vw] shadow-lg  bg-white   rounded-xl '>
                <div>
                    <div className='text-center text-3xl mt-9 mb-4 font-semibold'>SignUp</div>
                   

                    <form
                        action=""
                        className='flex flex-col mt-8 mr-8 ml-8'
                        onSubmit={handleSubmit(submitSignupForm)}
                    >
                        <label className='font-semibold' htmlFor='name '>Name <sup className='text-red-600'>*</sup></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1">
                                Please enter your name.
                            </span>
                        )}

                        <label className='mt-4 font-semibold' htmlFor='email'>Email <sup className='text-red-600'>*</sup></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                Please enter your email.
                            </span>
                        )}

                        <label className='mt-4 font-semibold' htmlFor='password'>Password <sup className='text-red-600'>*</sup></label>
                        <input
                            type="password"
                            className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                            name="password"
                            id="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                Please enter your password.
                            </span>
                        )}

                        <label className='mt-4 font-semibold' htmlFor='confirmpassword'>Confirm Password <sup className='text-red-600'>*</sup></label>
                        <input
                            type="password"
                            className='border-2  border-blue-700 p-2 rounded-md shadow-md '
                            name="confirmpassword"
                            id="confirmpassword"
                            {...register("confirmpassword", { required: true, validate: validatePasswordMatch })}
                        />
                        {errors.confirmpassword && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.confirmpassword.message}
                            </span>
                        )}

                        <button className='mt-9  bg-yellow-400 p-2 rounded-md hover:scale-105  hover:bg-blue-600 duration-300'>SignUp</button>
                    </form>

                    <div className='text-black text-center m-3'><span>------</span> OR <span>------</span></div>
                    <Link to='/login'>
                        <div className='text-blue-500 text-center mr-8 ml-8 mb-5 hover:bg-sky-100 hover:cursor-pointer p-1 transition-all duration-300'>
                            Login
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
