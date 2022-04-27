import { useState, useEffect, createContext } from 'react';
import { axiosClient } from '../config/axios';

export const AuthContext = createContext();

const validateTokenFromLS = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect pa peticiones async | modificar el state
  useEffect(() => {
    const authUser = async () => {
      const config = validateTokenFromLS();
      if (!config) return setLoading(false);

      try {
        // TODO: Refrescar el token como hace FH
        const { data } = await axiosClient('/veterinarians/perfil', config);

        setAuth(data.user);
      } catch (error) {
        console.log(error.response.data);
        setAuth({});
      }

      // Private Routes
      setLoading(false);
    };

    return () => {
      authUser();
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const updateProfile = async data => {
    const config = validateTokenFromLS();
    if (!config) return setLoading(false);

    try {
      await axiosClient.put(`veterinarians/profile/${data.uid}`, data, config);
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async passwordsObj => {
    const config = validateTokenFromLS();
    if (!config) return setLoading(false);

    try {
      const { data } = await axiosClient.put(
        `/veterinarians/update-password`,
        passwordsObj,
        config
      );

      return {
        msg: data.msg,
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, logOut, updateProfile, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
