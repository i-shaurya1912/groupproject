import React, { useState } from 'react';

// Custom component for input fields to handle styling and error display
const InputField = ({ name, type, placeholder, value, onChange, error }) => {
  // Determine if the input type should be password (to show different visibility icon, if implemented later)
  const inputType = (type === 'password' || type === 'confirmPassword') ? 'password' : type;

  return (
    <div>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        // Apply ring-red-500 if there is an error, otherwise use the default purple focus ring
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`
        }
      />
      {/* Display error message */}
      {error && (
        <p className="text-sm text-red-700 mt-1">{error}</p>
      )}
    </div>
  );
};

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    section: '',
    password: '',
    confirmPassword: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // 1. Validation Logic
  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Check all fields for required status
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        isValid = false;
      }
    });

    // Specific field validations
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 2. Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear the error for the current field as the user types
    if (errors[name]) {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    }
  };

  // 3. Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If validation passes
      console.log("Registration successful!", formData);
      // In a real application, you would send this data to a server here.
      // Reset form state if needed: setFormData(initialState);
      
      // Show a success message (instead of alert)
      setErrors({ form: 'Registration successful! Data logged to console.' });
      
    } else {
      // If validation fails
      setErrors(prev => ({ ...prev, form: 'Please correct the errors above.' }));
    }
  };

  return (
    // Outer container for the full screen (light blue/lavender background)
    <div className="min-h-screen p-4 sm:p-8 md:p-12" style={{ backgroundColor: '#ccccff' }}>
      
      {/* Header Bar (Purple Gradient) */}
      <header className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-800 to-indigo-900 flex items-center px-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-white">E</span>
          <span className="text-xl font-semibold text-white">Ease</span>
          <span className="text-green-400 text-sm">🌿</span> 
        </div>
      </header>

      {/* Main Content Area (Centering the registration form) */}
      <main className="flex flex-col items-center justify-center pt-24 pb-8">
        
        {/* Title: Register here */}
        <h1 className="text-4xl font-extrabold mb-8" style={{ color: '#000000', fontFamily: 'monospace' }}>
          Register here
        </h1>
        
        {/* Registration Form Container (Lilac/Purple box) */}
        <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl" style={{ backgroundColor: '#aa99cc' }}>
          
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            
            {/* Form-level error/success message */}
            {errors.form && (
                <div className={`text-center p-3 rounded-md font-semibold ${
                    errors.form.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {errors.form}
                </div>
            )}
            
            {/* First Name and Last Name (Side by Side) */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <InputField
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
              </div>
              <div className="w-1/2">
                <InputField
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
              </div>
            </div>
            
            {/* Phone Number */}
            <InputField
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
            />

            {/* Email Address */}
            <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            {/* Section */}
            <InputField
                name="section"
                type="text"
                placeholder="Section"
                value={formData.section}
                onChange={handleChange}
                error={errors.section}
            />
            
            {/* Password */}
            <InputField
                name="password"
                type="password" // This will render as type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
            
            {/* Confirm Password */}
            <InputField
                name="confirmPassword"
                type="password" // This will render as type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
            />
            
            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 text-lg font-semibold text-white rounded-md transition duration-300 ease-in-out hover:bg-purple-800"
              style={{ backgroundColor: '#663399' }} // Darker purple for the button
            >
              Register
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
