import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import React from 'react';
import { Link } from 'react-router-dom';


import { useState } from 'react';

import { registerUser, loginUser } from '../api/auth';





function Authform(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");





    const [isLogin, setIsLogin] = useState(true);

    

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(null);

      try {
        if (isLogin) {
          const response = await loginUser(email, password);
          console.log('Login success:', response.data);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          navigate('/edit');
        } else {
          const response = await registerUser(email, password, username);
          console.log('Registration success:', response.data);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          navigate('/edit');

        }
      } catch (err) {
        if (err.response && err.response.data) {
          const data = err.response.data;
          let firstError = 'Something went wrong';

          if (typeof data === 'object') {
            const firstKey = Object.keys(data)[0];
            if (Array.isArray(data[firstKey]) && data[firstKey].length > 0) {
              firstError = data[firstKey][0];
            } else if (typeof data[firstKey] === 'string') {
              firstError = data[firstKey];
            }
          } else if (typeof data === 'string') {
            firstError = data;
          }

          setErrorMessage(firstError);
        } else {
          setErrorMessage(err.message || 'Something went wrong');
        }
      }
    };


    if(isLogin){return(
        <div className=" w-full md:w-1/2 p-8 bg-blue-100 flex flex-col justify-center h-[500px]">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{isLogin? 'Sign in' : 'Sign up'}</h1>
          {errorMessage && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="yourEmail@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Password <Link to="/"><span className="text-red-800">(forgot?)</span></Link>
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-700 transition flex justify-center gap-2 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
              <p>Sign In</p>
            </button>
          </form>
          
          

          <p className="text-center text-sm mt-6">
            Don't have an account?{' '}
            <span onClick={() => setIsLogin(!isLogin)}className="text-red-800 underline cursor-pointer">Sign up here</span>

          </p>
        </div>
    );}
    else{
        return(
            <div className="w-full md:w-1/2 p-8 bg-blue-100 flex flex-col justify-center h-[500px]">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{isLogin? 'Sign in' : 'Sign up'}</h1>
            {errorMessage && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
              {errorMessage}
            </div>
          )}
            <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                
                    />
                    </div>
                    <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="yourEmail@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="block mb-1 font-medium">
                        Password <Link to="/"></Link>
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    

                    <button
                    type="submit"
                    className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-700 transition flex justify-center gap-2 cursor-pointer"
                    >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <p>Sign Up</p>
                    </button>
                </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <span onClick={() => setIsLogin(!isLogin)}className="text-red-800 underline cursor-pointer">Sign in here</span>

          </p>
        </div>
        );
    }
}

export default Authform;




