import React from 'react'

const Navbar = () => {

    return (
        <div>
            <div className='w-full py-4 px-3 font-bold text-lg text-white bg-green-400 h-16 flex justify-between'>
                <div>HackerThon</div>
                <div className='flex gap-7'>
                    <div className='cursor-pointer'>Profile</div>
                    <div className='cursor-pointer'>My Events</div>
                    <div className='cursor-pointer'>Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar