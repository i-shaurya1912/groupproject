import React from 'react'
import { Link, NavLink } from "react-router-dom";
const Front = () => {
  return (
    <div>

        
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-purple-700 text-white">
      {/* App Logo */}
      <h1 className="text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
        <span className="text-yellow-500">E</span>
            <span className="text-white">Ease</span>
      </h1>


     

      {/* Thought / Tagline */}
      <p className="text-xl italic text-center max-w-md opacity-90">
        “Simplicity is the ultimate sophistication.”
      </p>
       <Link to="/Welcome">
       <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105 mb-16 my-10">
              Welcome
            </button>
            </Link>

      

      {/* Optional small footer or version */}
      <p className="mt-10 text-sm opacity-70">© 2025 EEase</p>
    </div>

      
    </div>
  )
}

export default Front;
