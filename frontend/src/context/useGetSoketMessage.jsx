import React, { useEffect } from 'react'
import {useSocketContext} from './SocketContext'
import useConversation from '../zustand/useConversation'
import sound from '../assets/sound.wav'

const useGetSoketMessage = () => {
  const {socket} = useSocketContext() 
  const {messages,setMessage}= useConversation()

  useEffect(()=>{

    socket.on("newMessage" , (newMessage)=>{
      const notification = new Audio(sound)
      notification.play()
      setMessage([...messages,newMessage]);
    })
    return()=>{
      socket.off("newMessage")
    }
  },[socket , messages , setMessage])
  return (
    <div>useGetSoketMessage</div>
  )
}

export default useGetSoketMessage