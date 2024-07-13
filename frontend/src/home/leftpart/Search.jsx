import React, { useState } from 'react'

import { FiSearch } from "react-icons/fi";
import useGetAllUsers from '../../context/useGetAllUsers'
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const Search = () => {
    const [search, setSearch] = useState("")
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return;
        const conversation = allUsers.find((user) =>
            user.fullname?.toLowerCase().includes(search.toLocaleLowerCase()))
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")

        }
        else {
           toast.error("user not found")
        }
    }

    return (
        <div className='  '>

            <form onSubmit={handleSubmit} className=' flex justify-center items-center mt-1 h-[10vh]'>
                <div>
                    <label htmlFor="">

                        <input type="search" name="" id=""
                            className=' p-3 border-2 rounded-lg shadow-sm shadow-gray-200  border-slate-400 bg-white text-md mr-16 w-full  placeholder:text-xl placeholder:text-gray-700 '
                            placeholder=' Search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </div>
                <div className='  hover:bg-slate-200 p-2 rounded-full duration-300 ml-2 '>
                    <button>
                        <FiSearch className=' text-3xl ' />
                    </button>
                </div>
            </form>
        </div>


    )
}

export default Search