import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Cookies from "js-cookie"
import Loading from '../components/Loading';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userDetails, isLogin } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  if (userDetails.isAuth) {
    return <Navigate to="/" />
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/auth/login`, { userId, password })
      if (response.data.success) {
        Cookies.set('access_token', response.data.user.token)
        
        toast.success(response.data.message, {
          duration: 3000,
          position: 'top-right'
        });
        
        setTimeout(() => {
          navigate("/");
          setLoading(false);
          isLogin(response.data.user);
        }, 500)
      }

    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 3000,
        position: 'top-right'
      });
      console.log('error: ', error);
    }
    setLoading(false);

  }
  return (
    <>
      {isLoading && <Loading />}
      <div className='w-full flex flex-col items-center justify-center border'>
        <div className="w-2/5 h-auto flex flex-col items-center justify-center gap-3 border py-8 px-8 rounded-lg bg-white">
          <input
            type="text"
            className="w-full border-b border-gray-500 py-2 px-2 outline-none"
            placeholder="User Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            className="w-full border-b border-gray-500 py-2 px-2 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-gray-300 mt-8 py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Login