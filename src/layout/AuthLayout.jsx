import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <main className="container mx-auto md:grid  md:grid-cols-2 mt-12 gap-12 p-5 items-center">
        {!auth?.uid ? <Outlet /> : <Navigate to="/admin" replace />}
      </main>
    </>
  );
};
