import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loading,setLoading] = useState(true);
  const[userData,setUserData]=useState();
  let accessToken = localStorage.getItem("token");
  console.log("token" ,accessToken);
  const navigate = useNavigate();
  const {logout} = useAuth();
  useEffect(() => {
    const fetchUser = async() => {
      try {
       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log("user profile :",response.data);
        setUserData(response.data); 
        setLoading(false);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchUser();
  },[accessToken]);

  const handleLogOut = () => {
    logout();
    navigate('/');
  }

  if(loading){
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='flex items-center justify-center bg-white px-20 py-16 '>
          <h1 className='text-gray-700'>Fetching User Details...</h1>
        </div>
      </div>
    )
  }
  return (
  <div className='relative min-h-screen bg-pink-50 flex items-center justify-center'>
    <div className='fixed min-w-screen bg-rose-50 top-0 flex items-end justify-end border border-gray-500/10'>
      <div className='px-2 py-1 bg-red-500 rounded-lg mr-2 my-1 hover:bg-red-600'>
        <button className='text-white' onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </div>

    <div className="w-5xl mx-auto p-6 h-120">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden flex h-full">

        {/* LEFT PROFILE CARD */}
        <div className="w-1/3 bg-gradient-to-b from-pink-500 to-orange-400 p-6 flex flex-col items-center justify-center text-white">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-24 h-24 rounded-full mb-4"
          />

          <h2 className="text-xl font-semibold">{userData.username}</h2>
          <p className="text-sm opacity-90">Aadhaar: {userData.AadharNo}</p>
          <p className="text-sm mt-2">{userData.age} years old</p>

          <div className="mt-4">
            <a href="#" className="text-white text-lg hover:text-gray-200 transition">
              ✎
            </a>
          </div>
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="w-2/3 p-6 bg-amber-50">
          <h3 className="text-lg font-semibold mb-4">Information</h3>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="font-medium text-gray-700">Email</p>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Phone</p>
              <p className="text-gray-600">{userData.phoneNo}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">City</p>
              <p className="text-gray-600">{userData.city}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">State</p>
              <p className="text-gray-600">{userData.state}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Country</p>
              <p className="text-gray-600">{userData.country}</p>
            </div>

          </div>

          <hr className="my-4" />

        </div>

      </div>
    </div>
  </div>
);

}

export default Dashboard