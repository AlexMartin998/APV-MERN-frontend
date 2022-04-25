import { Link } from 'react-router-dom';

export const AdminNav = () => {
  return (
    <nav className="flex gap-4">
      <Link to="/admin/profile" className="font-bold uppercase text-gray-500">
        Perfil
      </Link>

      <Link
        to="/admin/change-password"
        className="font-bold uppercase text-gray-500"
      >
        Cambiar Password
      </Link>
    </nav>
  );
};
