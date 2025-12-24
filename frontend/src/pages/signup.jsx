import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  
  CheckCircle2,
  MapPinned,
  UserLock,
  ContactRound
} from "lucide-react";
import { validateAadhar, validateEmail, validatePassword } from "../utils/helper";
import { useAuth } from "../context/AuthContext";

const signup = () => {
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNo:'',
    age:'',
    city:'',
    state:'',
    country:'',
    AadharNo:""
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
    
  });

  const validateForm = () => {
  console.log('validating');

  const errors = {
    fullName: !formData.fullName ? "Enter full name" : '',
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
    AadharNo: validateAadhar(formData.AadharNo),
    phoneNo : formData.phoneNo.length === 10 ? '' : 'Enter 10 characters',
    age: !formData.age ? "Enter age" : '',
    city : !formData.city ? "Enter city" : '',
    state : !formData.state ? "Enter state" : '',
    country : !formData.country ? "Enter country" : '',
  };

  console.log(errors);

 
  Object.keys(errors).forEach((key) => {
    if (!errors[key]) delete errors[key];
  });

  setFormState((prev) => ({ ...prev, errors }));
  return Object.keys(errors).length === 0;
};


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("handle submit")
    if(!validateForm()) return;
    console.log('validated')
    setFormState((prev) => ({...prev,loading:true}));
    try {
      const response = await axios.post(
          import.meta.env.VITE_BASE_URL + "/api/auth/register",
          {
            username: formData.fullName,
            email: formData.email,
            password: formData.password,
            age: formData.age,
            phoneNo:formData.phoneNo,
            AadharNo:formData.AadharNo,
            city : formData.city,
            state : formData.state ,
            country : formData.country
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log(response.data);
        setFormState(prev => ({
        ...prev,
        success:true,
        loading:false,
        errors:{}
      }));

      const {token} = response.data;

      if(token){
        login(response.data,token);

        setTimeout(() => {
          window.location.href = '/dashboard'
        },2000)
      }
        
    } catch (error) {
      console.log(error);
      setFormState((prev) => ({
        ...prev,
        loading:false,
        errors:{
          submit:
          error.response?.data?.message ||
          "Registration failed . Please try again.",
        },
       }));
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.errors, [name]: "" },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div
          className="bg-white p-8 shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className="text-gray-600 mb-4">
             Your Account has been successfully created.
          </p>
          <div className="w-6 h-6 border-2 border-blue-600 animate-spin border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
    className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <form onSubmit={handleSubmit}>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 transform -translate-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                formState.errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              placeholder="Enter Your Full Name"
            ></input>
          </div>
          {formState.errors.fullName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.fullName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                formState.errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors `}
              placeholder="Enter Your Email"
            ></input>
          </div>
          {formState.errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.email}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password*
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={formState.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Create a strong password"
            ></input>
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
            >
              {formState.showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {formState.errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.password}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            phoneNo
          </label>
          <div className="relative">
            <ContactRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='number'
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.phoneNo ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Enter your phoneNo"
            ></input>
            
          </div>
          {formState.errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.phoneNo}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <div className="relative">
            <ContactRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='number'
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.age ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Enter your age"
            ></input>
            
          </div>
          {formState.errors.age && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.age}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            city
          </label>
          <div className="relative">
            <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='text'
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.city ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Enter your city"
            ></input>
            
          </div>
          {formState.errors.city && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.city}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            state
          </label>
          <div className="relative">
            <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='text'
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.state ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Enter your state"
            ></input>
            
          </div>
          {formState.errors.state && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.state}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            country
          </label>
          <div className="relative">
            <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='text'
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.country ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="Enter your country"
            ></input>
            
          </div>
          {formState.errors.country && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.country}
            </p>
          )}
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AadharNo
          </label>
          <div className="relative">
            <UserLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='number'
              name="AadharNo"
              value={formData.AadharNo}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                formState.errors.AadharNo ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                      `}
              placeholder="AadharNo"
            ></input>
            
          </div>
          {formState.errors.AadharNo && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formState.errors.AadharNo}
            </p>
          )}
          </div>
          {formState.errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {formState.errors.submit}
            </p>
            </div>
          )}
          <button
          type="submit"
          disabled={formState.loading}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {formState.loading ? (
              <>
              <Loader className="w-5 h-5 animate-spin"/>
              <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signup