import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Header } from './../components/Header';
import { Footer } from './../components/Footer';
import { useEffect } from 'react';
import { axiosClient } from '../config/axios';
import { usePatients } from '../hooks/usePatients';

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

export const PrivateRoute = () => {
  const { auth } = useAuth();
  const { setPatients } = usePatients();
  
  useEffect(() => {
    const getPatientsFromAuthUser = async () => {
      console.log('PATIENT PROVIDER');

      const config = validateTokenFromLS();
      if (!config) return;

      try {
        const { data } = await axiosClient(`/patients`, config);

        setPatients(data.patients);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    };

    // getPatientsFromAuthUser();
    return () => {
      getPatientsFromAuthUser();
    };
  }, []);

  /* useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const config = validateTokenFromLS();
        if (!config) return;

        const { data } = await axiosClient('/patients', config);
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []); */

  return (
    <>
      {auth?.uid ? (
        <>
          <Header />

          <main className="container mx-auto mt-14">
            <Outlet />
          </main>

          <Footer />
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};
