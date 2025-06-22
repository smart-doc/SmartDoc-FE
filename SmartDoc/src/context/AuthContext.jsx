// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'AUTH_START':
//       return { ...state, isLoading: true, error: null };
//     case 'AUTH_END':
//       return { ...state, isLoading: false };
//     case 'SIGN_IN':
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token,
//         isLoading: false,
//         error: null,
//       };
//     case 'SIGN_OUT':
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null,
//         isLoading: false,
//         error: null,
//       };
//     case 'AUTH_ERROR':
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         token: null,
//         isLoading: false,
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const validateToken = async () => {
//       dispatch({ type: 'AUTH_START' });
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');

//       if (!token || !userData) {
//         dispatch({ type: 'SIGN_OUT' });
//         return;
//       }

//       try {
//         const response = await axios.get(
//           'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/get/SignedinUserProfile',
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const user = response.data;
//         dispatch({
//           type: 'SIGN_IN',
//           payload: {
//             user: {
//               _id: user._id,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               email: user.email,
//               phoneNumber: user.phoneNumber,
//               role: user.role,
//               type: user.type,
//               hospitalName: user.hospitalName,
//               isAdmin: user.type === 'Admin' || user.role?.name === 'Admin',
//             },
//             token,
//           },
//         });
//       } catch (error) {
//         console.error('Token validation error:', error.response?.status, error.response?.data);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         dispatch({
//           type: 'AUTH_ERROR',
//           payload: { error: 'Invalid or expired session. Please sign in again.' },
//         });
//         toast.error('Session expired. Please sign in again.');
//         navigate('/');
//       } finally {
//         // Fixed: Use AUTH_END instead of AUTH_START
//         dispatch({ type: 'AUTH_END' });
//       }
//     };
//     validateToken();
//   }, [navigate]);

//   const signIn = async (email, password) => {
//     dispatch({ type: 'AUTH_START' });
//     try {
//       const response = await axios.post(
//         'https://smartdoc-p1ca.onrender.com/api/v1/auth/signin',
//         { email, password }
//       );
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));

//       const profileResponse = await axios.get(
//         'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/get/SignedinUserProfile',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const profileUser = profileResponse.data;

//       dispatch({
//         type: 'SIGN_IN',
//         payload: {
//           user: {
//             _id: profileUser._id,
//             firstName: profileUser.firstName,
//             lastName: profileUser.lastName,
//             email: profileUser.email,
//             phoneNumber: profileUser.phoneNumber,
//             role: profileUser.role,
//             type: profileUser.type,
//             hospitalName: profileUser.hospitalName,
//             isAdmin: profileUser.type === 'Admin' || profileUser.role?.name === 'Admin',
//           },
//           token,
//         },
//       });
//       return profileUser;
//     } catch (error) {
//       const errorMsg = error.response?.data?.error || 'Sign-in failed';
//       dispatch({ type: 'AUTH_ERROR', payload: { error: errorMsg } });
//       throw new Error(errorMsg);
//     }
//   };

//   const signOut = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'SIGN_OUT' });
//     navigate('/');
//     toast.success('Signed out successfully.');
//   };

//   return (
//     <AuthContext.Provider value={{ state, dispatch, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

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
      console.log('Validating token:', token);

      if (!token || !userData) {
        dispatch({ type: 'AUTH_END' });
        return;
      }

      try {
        console.log('Validating token:', token);
        const response = await axios.get(
          'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/get/SignedinUserProfile',
          { 
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
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
              // hospitalName: user.hospitalName,
              // isAdmin: user.type === 'Admin' || user.role?.name === 'Admin',
            },
            token,
          },
        });
      } catch (error) {
        console.error('Token validation error:', error.response?.status, error.response?.data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
          type: 'AUTH_ERROR',
          payload: { error: 'Invalid or expired session. Please sign in again.' },
        });
        
        // Only show toast and navigate if it's not a network timeout
        if (error.code !== 'ECONNABORTED') {
          toast.error('Session expired. Please sign in again.');
          // Only navigate if not already on login page
          if (window.location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
          } else {
        // For network errors, keep token and retry later
        dispatch({ type: 'AUTH_END' });
        }
      } finally {
        dispatch({ type: 'AUTH_END' }); 
      }
    };
    
    validateToken();
  }, [navigate]);

  const signIn = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/auth/signin',
        { email, password },
        { timeout: 10000 }
      );
      const { token, user } = response.data;
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Get full profile
      const profileResponse = await axios.get(
        'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/get/SignedinUserProfile',
        { 
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000 
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
    <AuthContext.Provider value={{ state, dispatch, signIn, signOut }}>
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