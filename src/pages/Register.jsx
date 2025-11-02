import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- NavBar Component ---
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    setMessage(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); 

    if (!validate()) {
      setMessage({ type: 'error', text: "Please correct the highlighted errors before submitting." });
      return;
    }

    setIsLoading(true);

    try {
      
      const response = await fetch('https://eventmanager-dr2z.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          'Accept': 'application/json',
        },
        mode: 'cors', 
        credentials: 'omit',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
     
      setMessage({ 
        type: 'success', 
        text: data.message || "✅ Registration successful! Welcome to the club." 
      });


      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setErrors({});

      
      setTimeout(() => {
        navigate('/Login');
      }, 2000);

    } catch (error) {
      
      console.error('Registration error:', error);
      
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage({ 
          type: 'error', 
          text: "❌ Network error. Please check your internet connection and try again." 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || "❌ Registration failed. Please try again." 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-purple-600">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main Content */}
      <div className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden min-h-[550px]">
          {/* --- Left Section (Info/Welcome) --- */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-purple-900 text-white flex-col justify-center items-center p-10 rounded-l-2xl">
            <h1 className="text-4xl font-extrabold mb-4 text-center leading-tight tracking-wider">
              Join Our Community
            </h1>
            <p className="text-xl font-light text-center opacity-90">
              Sign up now to explore exclusive content and events.
            </p>
            <div className="mt-8">
              {/* Simple SVG Icon */}
              <svg className="w-20 h-20 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>

          {/* --- Right Section (Form) --- */}
          <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center rounded-2xl md:rounded-r-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
              Create Account
            </h2>

            {/* Message Box (Success/Error Messages) */}
            {message && (
              <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="full Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.password}</p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition duration-200 ease-in-out transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Registering..." : "Register Now"}
              </button>
            </form>

            
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
              <button
                onClick={() => navigate('/Login')}
                type="button"
                className="font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
              >
                Log In
              </button>
            </div>

           
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

export default Register;

