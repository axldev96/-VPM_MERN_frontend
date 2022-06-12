import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient('/veterinarians/profile', config);
        setAuth(data);
      } catch ({ response }) {
        setAuth({});
      }

      setLoading(false);
    };
    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const updateProfile = async (data) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarians/profile/${data._id}`;
      const res = await axiosClient.put(url, data, config);

      return {
        msg: 'Saved succefully',
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const savePassword = async (data) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarians/change-password/`;
      const res = await axiosClient.put(url, data, config);

      return {
        msg: res.data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, logOut, updateProfile, savePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
