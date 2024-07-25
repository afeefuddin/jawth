"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  // Add other user properties as needed
}

function Dashboard() {

  const router = useRouter()
  async function handleLogout(){
   try {
     await axios.post('/api/logout',{},{withCredentials: true})
    router.push('/login')
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-10">
     <div className='text-center text-2xl font-bold'>
      Welcome to your dashboard!
     </div>
      <main className="dashboard-content">
        {/* Add your dashboard content here */}
        <button className="bg-black text-white py-3 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </main>
    </div>
  );
}

export default Dashboard;