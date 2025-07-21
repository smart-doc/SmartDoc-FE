import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_END':
      return { ...state, isLoading: false };
    case 'SIGN_IN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      dispatch({ type: 'AUTH_START' });
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        dispatch({ type: 'AUTH_END' });
        return;
      }

      try {
        const response = await axios.get(
          'https://smartdoc-4fo9.onrender.com/api/v1/user/profile/get/SignedInUserProfile',
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000,
          }
        );
        const user = response.data;
        dispatch({
          type: 'SIGN_IN',
          payload: {
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
              type: user.type,
            },
            token,
          },
        });
      } catch (error) {
        console.error('Token validation error:', error.response?.data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
          type: 'AUTH_ERROR',
          payload: { error: 'Invalid or expired session. Please sign in again.' },
        });

        if (error.code !== 'ECONNABORTED') {
          toast.error('Session expired. Please sign in again.');
          if (window.location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        } else {
          dispatch({ type: 'AUTH_END' });
        }
      } finally {
        dispatch({ type: 'AUTH_END' });
      }
    };

    validateToken();
  }, [navigate]);

  const getUserByEmail = async (email) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.get(
        `https://smartdoc-4fo9.onrender.com/api/v1/user/profile/get/${encodeURIComponent(email.toLowerCase())}`,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      const user = response.data;
      return {
        _id: user._id,
        email: user.email,
        type: user.type,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch user';
      dispatch({ type: 'AUTH_ERROR', payload: { error: errorMsg } });
      throw new Error(errorMsg);
    } finally {
      dispatch({ type: 'AUTH_END' });
    }
  };

  const verifyOtp = async (email, otp) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(
        'https://smartdoc-4fo9.onrender.com/api/v1/auth/verify-otp',
        { email: email.toLowerCase(), otp },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.error || 'Invalid OTP');
      }
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to verify OTP';
      dispatch({ type: 'AUTH_ERROR', payload: { error: errorMsg } });
      throw new Error(errorMsg);
    } finally {
      dispatch({ type: 'AUTH_END' });
    }
  };

  const resendOtp = async (email) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(
        'https://smartdoc-4fo9.onrender.com/api/v1/auth/resend-otp',
        { email: email.toLowerCase() },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      toast.success(response.data.message || 'Verification OTP sent to your email!');
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to resend OTP';
      dispatch({ type: 'AUTH_ERROR', payload: { error: errorMsg } });
      throw new Error(errorMsg);
    } finally {
      dispatch({ type: 'AUTH_END' });
    }
  };

  const signIn = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(
        'https://smartdoc-4fo9.onrender.com/api/v1/auth/signin',
        { email: email.toLowerCase(), password },
        { timeout: 10000 }
      );
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const profileResponse = await axios.get(
        'https://smartdoc-4fo9.onrender.com/api/v1/user/profile/get/SignedInUserProfile',
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );
      const profileUser = profileResponse.data;

      dispatch({
        type: 'SIGN_IN',
        payload: {
          user: {
            _id: profileUser._id,
            firstName: profileUser.firstName,
            lastName: profileUser.lastName,
            email: profileUser.email,
            phoneNumber: profileUser.phoneNumber,
            role: profileUser.role,
            type: profileUser.type,
            hospitalName: profileUser.hospitalName,
            isAdmin: profileUser.type === 'Admin' || profileUser.role?.name === 'Admin',
          },
          token,
        },
      });
      return profileUser;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Sign-in failed';
      dispatch({ type: 'AUTH_ERROR', payload: { error: errorMsg } });
      throw new Error(errorMsg);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'SIGN_OUT' });
    navigate('/', { replace: true });
    toast.success('Signed out successfully.');
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signIn, signOut, getUserByEmail, verifyOtp, resendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};