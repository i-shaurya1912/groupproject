import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadset, FaUserTie } from "react-icons/fa";

// Role Card Component - Kept separate for clean structure
const RoleCard = ({ title, description, icon: Icon, bgColor, iconColor }) => (
  <div
    className={`p-6 rounded-lg shadow-2xl cursor-pointer ${bgColor} text-gray-900 transform transition duration-300 hover:scale-[1.03] border-4 border-white/50`}
  >
    <div className={`text-6xl mb-4 ${iconColor} text-center flex justify-center`}>
      <Icon />
    </div>
    <h3 className="text-3xl font-extrabold mb-2 text-center">{title}</h3>
    <p className="text-center font-medium opacity-90">{description}</p>
  </div>
);

// Main App component
const Welcome = () => {
  return (
    <>

      <div className="min-h-screen bg-purple-900/90 font-sans text-white">
        {/* Header/Navigation Bar */}
        <header className="flex justify-between items-center p-4 md:p-6 bg-purple-900/70 shadow-lg">
          <div className="flex items-center text-3xl font-bold tracking-wider">
            <span className="text-yellow-300">E</span>
            <span className="text-white">Ease</span>
            <div className="w-6 h-6 ml-1 bg-green-400 rounded-full opacity-0"></div>
          </div>
          <nav className="space-x-4 md:space-x-8 text-lg">
            <a href="#" className="hover:text-purple-300 transition">
              Admin
            </a>
            <a href="#" className="hover:text-purple-300 transition">
              User
            </a>
          </nav>
        </header>

        {/* Main Content Area */}
        {/* The main container already centers block content via items-center */}
        <main className="flex flex-col items-center p-8 text-center min-h-[calc(100vh-80px)]">
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 mt-12">
            <NavLink to="/Register"> Welcome to</NavLink>
            <span className="text-yellow-300">Event</span>Ease
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-xl">
            Simplify your events - from planning to perfection
          </p>

          <Link to="/Login">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300 transform hover:scale-105 mb-16">
              Get started
            </button>
          </Link>

          <h2 className="text-2xl text-gray-100 mb-8 mt-4">
            Choose your role to continue
          </h2>

          {/* Role Cards Grid - FIX APPLIED HERE: changed md:grid-cols-3 to md:grid-cols-2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-center mx-auto">
            
            <RoleCard
              title="Admin"
              description="Manage teams, budgets & all event operations."
              icon={FaHeadset}
              bgColor="bg-yellow-200"
              iconColor="text-gray-900"
            />
            <RoleCard
              title="User"
              description="Plan your perfect event - book venues."
              icon={FaUserTie}
              bgColor="bg-pink-300"
              iconColor="text-gray-900"
            />
            
            {/* If you add the Staff role back, change md:grid-cols-2 back to md:grid-cols-3 */}
            {/*
            <RoleCard
              title="Staff"
              description="Coordinate logistics and onsite tasks."
              icon="fas fa-people-carry-box"
              bgColor="bg-green-300"
              iconColor="text-gray-900"
            />
            */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Welcome;