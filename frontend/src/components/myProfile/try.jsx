import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import ChangeProfilePicture from './UpdateProfilePic';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';

const Settings = () => {
    const navigate = useNavigate();
//   const [authUser]  = useAuth();
//    const Id = authUser._id;
    


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.put("https://chat-website-isk6.onrender.com/api/user/updateProfile", { Id, ...data }); 
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Update profile error", error);
            toast.error("Unable to update profile");
        }
        toast.dismiss(toastId);
    };

    return (
        <div className='w-[50vw] bg-white h-[60vh] rounded-2xl relative'>
            <div className='h-[70px]'></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-4xl font-semibold ml-28'>Update Profile</div>
                <div className='h-[30vh] w-[35vw] mt-[8vh] ml-28 flex justify-around items-center gap-4'>
                    <div className='w-[50%] mt-10'>
                        <div>
                            <div className='text-xl font-bold'>FullName</div>
                            <input
                                type="text"
                                name="FullName"
                                id="FullName"
                                placeholder="Enter FullName"
                                className="flex border-2 border-black font-semibold text-gray-600 w-full p-2 rounded-md mt-2"
                                {...register("FullName", { required: "Please enter your FullName." })}
                                defaultValue={authUser.fullname}
                            />
                            {errors.FullName && (
                                <span className="-mt-1 text-[12px] text-red-400">
                                    {errors.FullName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className='text-xl font-bold mt-2'>Bio</div>
                            <input
                                type="text" 
                                name="bio"
                                id="bio"
                                placeholder="Enter Your Bio"
                                className="flex border-2 border-black font-semibold text-gray-600 w-full p-2 rounded-md mt-2"
                                {...register("bio", { required: "Please enter your Bio." })}
                                defaultValue={authUser.bio}
                            />
                            {errors.bio && (
                                <span className="-mt-1 text-[12px] text-red-400">
                                    {errors.bio.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='w-[50%] mt-10'>
                        <div>
                            <div className='text-xl font-bold'>DOB</div>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="flex border-2 border-black font-semibold text-gray-600 w-full p-2 rounded-md mt-2"
                                {...register("dateOfBirth", {
                                    required: "Please enter your Date of Birth.",
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={authUser.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="mt-1 text-[12px] text-red-400">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className='text-xl font-bold mt-2'>Email</div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className="flex border-2 border-black font-semibold text-gray-600 w-full p-2 rounded-md mt-2"
                                {...register("email", { required: "Please enter your Email." })}
                                defaultValue={authUser.email}
                            />
                            {errors.email && (
                                <span className="-mt-1 text-[12px] text-red-400">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[200px] h-[200px] absolute top-5 right-5 duration-200 flex justify-center items-center'>
                    <ChangeProfilePicture />
                </div>
                <div className='flex justify-end gap-4 m-2 mr-10'>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/MyProfile/MainProfile");
                        }}
                        className='p-3 border-2 border-black rounded-md bg-gray-300 hover:scale-105 duration-150 font-bold'>Cancel</button>
                    <button
                        type="submit"
                        className='p-3 border-2 border-black rounded-md bg-green-400 hover:scale-105 duration-150 font-bold'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
