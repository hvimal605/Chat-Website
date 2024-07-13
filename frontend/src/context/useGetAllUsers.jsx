import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const token = Cookies.get('harshcookie')
                const response = await axios.get('/api/user/allusers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAllUsers(response.data) // Assign only the data part of the response
            } catch (error) {
                console.log("Error in useGetAllUsers: " + error)
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [])

    return [allUsers, loading]
}

export default useGetAllUsers
