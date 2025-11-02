import React, { useState } from 'react';

const Reset = () => {
  // State for the new password input
  const [password, setPassword] = useState('');
  // State for validation messages
  const [message, setMessage] = useState('');

  // Validation function
  const validatePassword = (newPassword) => {
    // Check if the password has at least 6 characters
    const isValid = newPassword.length >= 6;
    return isValid;
  };

  // Handler for input changes
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Update validation message dynamically
    if (newPassword.length > 0 && newPassword.length < 6) {
      setMessage('Password must be at least 6 characters.');
    } else {
      setMessage(''); // Clear message if valid or empty
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword(password)) {
      alert('Password successfully reset!'); // Success feedback
      // In a real application, you would send the password to a server here.
    } else {
      setMessage('Please enter a valid password of at least 6 characters.');
    }
  };

  // Check state for the checkbox validation visual (at least 6 characters)
  const isLengthValid = password.length >= 6;

  return (
    // Main container: full screen, light purple background
    <div className="min-h-screen bg-purple-200 flex flex-col">
      
      {/* 1. Navigation Bar */}
      <nav className="w-full bg-purple-900 shadow-md p-4 flex items-center justify-between">
        <div className="text-2xl font-bold flex items-center text-white">
          <span className="text-yellow-400 ">E</span>
          <span className="text-white ">Ease</span>
        </div>
        <div className="space-x-4">
          {/* Example Nav Links (optional) */}
          <a href="#" className="text-white hover:text-green-300">Home</a>
          <a href="#" className="text-white hover:text-green-300">Support</a>
        </div>
      </nav>

      {/* 2. Main Content Area */}
      <div className="flex-grow flex items-center justify-center p-4 bg-purple-700">
        
        {/* Outer card/form container */}
        <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl min-h-[450px]">
          
          {/* Left Section: Dark Purple, "Forgot Password?" */}
          <div className="w-2/5 bg-purple-900 text-white p-12 flex flex-col justify-center relative">
            
            {/* Background decorative shape */}
            <div className="absolute top-0 right-0 h-full w-full bg-purple-800 opacity-60 transform translate-x-1/2 rounded-full"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Forgot password?
              </h2>
              <p className="text-xl">
                Create a new one
              </p>
            </div>
          </div>
          
          {/* Right Section: Light Purple/Lavender, Reset Password Form */}
          <form onSubmit={handleSubmit} className="w-3/5 bg-purple-300 p-12 flex flex-col justify-center relative">
            
            {/* Background decorative shape */}
            <div className="absolute top-0 left-0 h-full w-full bg-purple-400 opacity-50 transform -translate-x-1/3 rounded-[40%]"></div>
            
            {/* Form Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold mb-8 text-black">
                Reset Password
              </h1>
              
              <p className="text-lg mb-4 text-black">
                Please enter new one
              </p>

              {/* Password Input Field */}
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-md"
                required
                minLength="6"
              />

              {/* Validation Message Area */}
              {message && (
                <p className="text-sm text-red-600 mb-4 font-semibold">{message}</p>
              )}

              {/* Password Validation Checkbox (Visual Feedback) */}
              <div className="flex items-center mb-10">
                {/* Custom-styled checkbox/circle */}
                <div className={`w-5 h-5 border-2 border-black rounded-full flex items-center justify-center transition-colors ${isLengthValid ? 'bg-black' : 'bg-white'}`}>
                    {isLengthValid && <span className="text-white text-xs">✓</span>}
                </div>
                
                <label className="ml-3 text-lg font-bold text-black leading-tight">
                  Your password must contain atleast **6 character** :
                </label>
              </div>

              {/* Done Button */}
              <button
                type="submit"
                className="bg-purple-900 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 transform hover:scale-105"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;