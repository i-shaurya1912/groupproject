import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// The main App component holds all state and handles the form logic
const Login = () => {
  const navigate = useNavigate();
  
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  // State for displaying success or error messages (replaces alert)
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

    // Validation checks
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous message

    if (!validate()) {
      setMessage({ type: 'error', text: "Please correct the highlighted errors before submitting." });
      return;
    }

    setIsLoading(true);

    try {
      // API call to login endpoint with CORS headers
      const response = await fetch('https://eventmanager-dr2z.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // CORS headers - backend should handle these, but we send proper headers
          'Accept': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'omit', // Don't send cookies for cross-origin requests
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Success message
      setMessage({ 
        type: 'success', 
        text: data.message || "🔑 Logged in successfully! Redirecting to events..." 
      });

      // Reset form data after successful submission
      setFormData(initialFormData);
      setErrors({});

      // Navigate to Events page after successful login
      setTimeout(() => {
        navigate('/Events');
      }, 1500);

    } catch (error) {
      // Handle network errors or API errors
      console.error('Login error:', error);
      
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage({ 
          type: 'error', 
          text: "❌ Network error. Please check your internet connection and try again." 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || "❌ Login failed. Please check your credentials and try again." 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              Discover & Connect
            </h1>
            <p className="text-xl font-light text-center opacity-90">
              We're glad to see you again. Enter your details to continue.
            </p>
            <div className="mt-8">
              {/* Simple SVG Icon (Placeholder) */}
              <svg className="w-20 h-20 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>

          {/* --- Right Section (Form) --- */}
          <div className={`w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center rounded-2xl md:rounded-r-2xl`}>
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
              Welcome Back
            </h2>

            {/* Message Box (Replaces Alert) */}
            {message && (
              <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.password}</p>
                )}
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition duration-200 ease-in-out transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Toggle to Register */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm mb-2">Don't have an account yet?</p>
              <button
                onClick={() => navigate('/Register')}
                type="button"
                className="font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
              >
                Register
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
