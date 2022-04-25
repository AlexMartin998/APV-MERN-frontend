import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Header } from './../components/Header';
import { Footer } from './../components/Footer';

export const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* TODO: Hacer diferenrtes Routers como FH??? */}
      {/* <Header /> */}

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

      {/* <Footer /> */}
    </>
  );
};
