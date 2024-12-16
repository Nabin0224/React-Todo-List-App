import React from 'react'

const Navbar = () => {
  return (
    <>

    <nav className="flex justify-between bg-indigo-900 py-3 text-white">
        <div className="logo">
            <span className="text-xl font-bold mx-8">
                iTask
            </span>
        </div>
            <ul className="flex gap-5 px-5">
                <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-300'>Your Tasks</li>
            </ul>
    </nav>
    </>
  )
}

export default Navbar