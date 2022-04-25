import { useState, useEffect, createContext } from 'react';
import { axiosClient } from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const tokenJWT = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenJWT}`,
    },
  };

  // useEffect pa peticiones async | modificar el state
  useEffect(() => {
    const authUser = async () => {
      if (!tokenJWT) return setLoading(false);

      try {
        // TODO: Refrescar el token como hace FH
        const { data } = await axiosClient('/veterinarians/perfil', config);

        setAuth(data.user);
      } catch (error) {
        console.log(error.response.data);
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
    try {
      await axiosClient.put(`veterinarians/profile/${data.uid}`, data, config);
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async passwordsObj => {
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
