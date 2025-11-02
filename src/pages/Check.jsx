import React, { useState, useRef } from 'react';

const Check = () => {
  // State to hold the 4-digit OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  // State for any validation message
  const [message, setMessage] = useState('');
  // Refs for each input field to manage focus
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handler for OTP input changes
  const handleChange = (element, index) => {
    // Ensure only digits are entered
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // If a digit is entered and it's not the last input, move focus to the next input
    if (element.value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    
    // Clear message as user starts typing
    if (message) setMessage('');
  };

  // Handler for backspace key to move focus backwards
  const handleKeyDown = (element, index) => {
    // If backspace is pressed and the current input is empty, move focus to the previous input
    if (element.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handler for form submission (Verify button)
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length === 4 && !isNaN(enteredOtp)) {
      // In a real app, you'd send this OTP to a server for verification
      setMessage('');
      alert(`OTP Verified: ${enteredOtp}`);
      // Simulate success, e.g., redirect to dashboard
    } else {
      setMessage('Please enter a valid 4-digit code.');
    }
  };

  // Handler for "Send again" button
  const handleSendAgain = () => {
    setOtp(['', '', '', '']); // Clear OTP fields
    setMessage('New code sent! Please check your phone.'); // Simulate sending new code
    inputRefs[0].current.focus(); // Focus on the first input
  };

  return (
    // Main container: full screen, light purple background, flex column for nav + content
    <div className="min-h-screen bg-purple-700 flex flex-col">
      
      {/* 1. Navigation Bar */}
      <nav className="w-full bg-purple-900 shadow-md p-4 flex items-center justify-between">
        <div className="text-2xl font-bold flex items-center text-white">
          <span className="text-yellow-300">E</span>
            <span className="text-white">Ease</span>
        </div>
        <div className="space-x-4">
          {/* Example Nav Links (optional) */}
          <a href="#" className="text-white hover:text-green-300">Home</a>
          <a href="#" className="text-white hover:text-green-300">Support</a>
        </div>
      </nav>

      {/* 2. Main Content Area */}
      <div className="flex-grow flex items-center justify-center p-4">
        
        {/* Outer card/form container with a fixed max-width and shadow */}
        <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl min-h-[450px]">
          
          {/* Left Section: Dark Purple, "Enter the code..." */}
          <div className="w-2/5 bg-purple-900 text-white p-12 flex flex-col justify-center relative">
            
            {/* Background decorative shape */}
            <div className="absolute top-0 right-0 h-full w-full bg-purple-800 opacity-60 transform translate-x-1/2 rounded-full"></div>

            {/* Content, positioned above the shape layer */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold">
                Enter the code sent to your phone
              </h2>
            </div>
          </div>
          
          {/* Right Section: Light Purple/Lavender, OTP Form */}
          <form onSubmit={handleSubmit} className="w-3/5 bg-purple-300 p-12 flex flex-col justify-center relative">
            
            {/* Background decorative large rounded shape */}
            <div className="absolute top-0 left-0 h-full w-full bg-purple-400 opacity-50 transform -translate-x-1/3 rounded-[40%]"></div>
            
            {/* Form Content, positioned above the shape layer */}
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold mb-8 text-black">
                Check your phone
              </h1>
              
              {/* OTP Input Fields */}
              <div className="flex justify-center space-x-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={inputRefs[index]}
                    className="w-16 h-16 text-4xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-md bg-white text-black"
                  />
                ))}
              </div>

              {/* Validation Message */}
              {message && (
                <p className="text-sm text-red-600 mb-6 text-center font-semibold">{message}</p>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full bg-purple-900 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 transform hover:scale-105 mb-4"
              >
                Verify
              </button>

              {/* Send Again Button */}
              <button
                type="button"
                onClick={handleSendAgain}
                className="w-full bg-transparent border-2 border-purple-900 text-purple-900 font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-purple-100 transition duration-300 transform hover:scale-105"
              >
                Send again
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Check;