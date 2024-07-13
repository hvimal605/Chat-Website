import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import ChangeProfilePicture from './UpdateProfilePic';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';

const Settings = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth();

    // Destructure authUser safely to prevent potential undefined errors
    const { _id: Id, fullname, bio, dateOfBirth, email } = authUser || {};

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue // Adding setValue for setting form values dynamically
    } = useForm({
        defaultValues: {
            FullName: fullname || '', // Handle potential undefined values
            bio: bio || '',
            dateOfBirth: dateOfBirth || '',
            email: email || '',
        }
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.put("/api/user/updateProfile", { Id, data });
            // console.log("ye dekh le",response.data.user.image)
            if (response.data.success) {
                // Update local authUser context or state here
                setAuthUser(prevAuthUser => ({
                    ...prevAuthUser,
                    fullname: data.FullName,
                    bio: data.bio,
                    dateOfBirth: data.dateOfBirth,
                    email: data.email,
                    image:response.data.user.image
                }));
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
        <div className='container mx-auto px-4 py-4'>
            <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-2xl md:text-4xl font-semibold mb-6 text-center md:text-left'>Update Profile</div>
                    <div className='flex justify-end mb-6'>
                        <div className='relative top-0 right-14 md:top-[-20px] md:right-64 duration-200 flex justify-center items-center'>
                            <ChangeProfilePicture />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='text-lg font-bold'>FullName</label>
                            <input
                                type="text"
                                name="FullName"
                                id="FullName"
                                placeholder="Enter FullName"
                                className="w-full border-2 border-black font-semibold text-gray-600 p-2 rounded-md mt-2"
                                {...register("FullName", { required: "Please enter your FullName." })}
                            />
                            {errors.FullName && (
                                <span className="text-sm text-red-400">
                                    {errors.FullName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='text-lg font-bold'>Bio</label>
                            <input
                                type="text"
                                name="bio"
                                id="bio"
                                placeholder="Enter Your Bio"
                                className="w-full border-2 border-black font-semibold text-gray-600 p-2 rounded-md mt-2"
                                {...register("bio", { required: "Please enter your Bio." })}
                            />
                            {errors.bio && (
                                <span className="text-sm text-red-400">
                                    {errors.bio.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='text-lg font-bold'>DOB</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="w-full border-2 border-black font-semibold text-gray-600 p-2 rounded-md mt-2"
                                {...register("dateOfBirth", {
                                    required: "Please enter your Date of Birth.",
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                            />
                            {errors.dateOfBirth && (
                                <span className="text-sm text-red-400">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='text-lg font-bold'>Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className="w-full border-2 border-black font-semibold text-gray-600 p-2 rounded-md mt-2"
                                {...register("email", { required: "Please enter your Email." })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-400">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end gap-4 mt-6'>
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/MyProfile/MainProfile");
                            }}
                            className='px-4 py-2 border-2 border-black rounded-md bg-gray-300 hover:scale-105 duration-150 font-bold'>Cancel</button>
                        <button
                            type="submit"
                            className='px-4 py-2 border-2 border-black rounded-md bg-green-400 hover:scale-105 duration-150 font-bold'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;
