import React, { useState } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';

import Home from './home/Home';
import Login from './components/Login.';
import SignUp from './components/SignUp';
import { useAuth } from './context/AuthProvider';
import Loading from './components/Loading';
import {Toaster} from 'react-hot-toast'
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import MyProfile from './components/myProfile/MyProfile';
import MainProfile from './components/myProfile/MainProfile';
import Settings from './components/myProfile/Settings';
import DeleteAccount from './components/myProfile/DeleteAccount';


const App = () => {
  const [authUser , setAuthUser]=useAuth()
  // console.log(authUser)
  return (
    <div className=' bg-slate-300 ' >
      
        <Routes>
          <Route path='/' element={authUser?(<Home />):(<Navigate to='/login'/>)} />
          <Route path='/signup' element={authUser?(<Navigate to='/'/>):(<SignUp/>)}  />
          <Route path='/login' element={authUser?(<Navigate to='/'/>):(<Login />)} />
          <Route path='/ResetPassword' element={<ForgotPassword/>}/>
          <Route path='/update-password/:id' element={<UpdatePassword/>}/>
         
          <Route element={<MyProfile/>}>

          <Route path='myProfile/MainProfile' element={<MainProfile />} />
          <Route path='myProfile/Setting' element={<Settings />} />
          <Route path='myProfile/DeleteAccount' element={<DeleteAccount />} />

          </Route>
        </Routes>
        <Toaster/>
      
    </div>
  );
}

export default App;
