import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { role, email } = useParams();
    const navigate=useNavigate()
   
    const handleNavigate=()=>{
        navigate(`/MyEvents/${email}`)
    }


    return (
        <div>
            <div className='w-full py-4 px-3 font-bold text-lg text-white bg-green-400 h-16 flex justify-between'>
                <div>HackerThon</div>
                <div className='flex gap-7'>
                    <div className='cursor-pointer'>Profile</div>
                   {role==="participant" &&  <div className='cursor-pointer' onClick={handleNavigate}>My Events</div>}
                    <div className='cursor-pointer'>Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar