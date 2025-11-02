import React, { useState } from "react";

// The main App component holds all state and handles the form logic
const Login = () => {
  const initialFormData = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  // State to toggle between Register (true) and Login (false) mode
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  // State for displaying success or error messages (replaces alert)
  const [message, setMessage] = useState(null);

  // --- NavBar Component (New) ---
  const NavBar = () => (

    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        {/* EEase Logo: First E is yellow, rest is white */}
        <div className="text-3xl font-extrabold tracking-tight cursor-default select-none">
          <span className="text-yellow-400">E</span>
          <span className="text-white">Ease</span>
        </div>
      </div>
    </header>
  );

  // --- Validation ---
  const validate = () => {
    const newErrors = {};

    // Validation checks that apply only to Registration Mode
    if (isRegisterMode) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
      if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    // Validation checks that apply to both modes
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors for the field being changed
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    setMessage(null); // Clear overall message when typing
  };

  // Function to switch between Login and Register views
  const handleModeToggle = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData(initialFormData); // Clear form data on switch
    setErrors({}); // Clear validation errors on switch
    setMessage(null); // Clear messages on switch
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous message

    if (validate()) {
      // --- SUCCESS: Clear form and show message ---
      if (isRegisterMode) {
        console.log("Registered:", formData);
        setMessage({ type: 'success', text: "✅ Registration successful! Welcome to the club." });
      } else {
        console.log("Logged In:", formData);
        setMessage({ type: 'success', text: "🔑 Logged in successfully! Redirecting you now..." });
      }

      // Reset form data after successful submission
      setFormData(initialFormData);
      setErrors({});

    } else {
      // --- FAILURE: Show error message ---
      setMessage({ type: 'error', text: "Please correct the highlighted errors before submitting." });
    }
  };

  const formTitle = isRegisterMode ? "Create Account" : "Welcome Back";
  const buttonText = isRegisterMode ? "Register Now" : "Log In";
  const toggleText = isRegisterMode ? "Already have an account?" : "Don't have an account yet?";
  const toggleButtonText = isRegisterMode ? "Log In" : "Register";

  return (
    // Outer container for the whole app
    <div className="min-h-screen font-sans bg-purple-600">
      {/* 1. Navigation Bar (New) */}
      <NavBar />
      
      {/* 2. Main Content (The Form) - uses pt-16 to offset the fixed h-16 navbar */}
      <div
        className="pt-16 min-h-screen flex items-center justify-center p-4"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden min-h-[550px]">

          {/* --- Left Section (Info/Welcome) --- */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-purple-900 text-white flex-col justify-center items-center p-10 rounded-l-2xl">
            <h1 className="text-4xl font-extrabold mb-4 text-center leading-tight tracking-wider">
              {isRegisterMode ? "Join Our Community" : "Discover & Connect"}
            </h1>
            <p className="text-xl font-light text-center opacity-90">
              {isRegisterMode ? "Sign up now to explore exclusive content and events." : "We're glad to see you again. Enter your details to continue."}
            </p>
            <div className="mt-8">
              {/* Simple SVG Icon (Placeholder) */}
              <svg className="w-20 h-20 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>

          {/* --- Right Section (Form) --- */}
          <div className={`w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center rounded-2xl md:rounded-r-2xl`}>
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
              {formTitle}
            </h2>

            {/* Message Box (Replaces Alert) */}
            {message && (
              <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name (Only visible in Register Mode) */}
              {isRegisterMode && (
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>
              )}

              {/* Phone (Only visible in Register Mode) */}
              {isRegisterMode && (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.password}</p>
                )}
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition duration-200 ease-in-out transform hover:scale-[1.01]"
              >
                {buttonText}
              </button>
            </form>

            {/* Toggle Button */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm mb-2">{toggleText}</p>
              <button
                onClick={handleModeToggle}
                type="button"
                className="font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
              >
                {toggleButtonText}
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-100">
              <button className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition duration-150 shadow-sm">
                <span className="text-xl font-bold text-gray-700">G</span>
              </button>
              <button className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition duration-150 shadow-sm">
                <span className="text-xl font-bold text-blue-600">f</span>
              </button>
              <button className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition duration-150 shadow-sm">
                <span className="text-xl font-bold text-blue-700">in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
