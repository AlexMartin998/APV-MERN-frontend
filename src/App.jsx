import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthLayout } from './layout/AuthLayout';
import { PrivateRoute } from './layout/PrivateRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ConfirmAccount } from './pages/ConfirmAccount';
import { ResetPassword } from './pages/ResetPassword';
import { NewPassword } from './pages/NewPassword';
import { PatientManagement } from './pages/PatientManagement';

import { AuthProvider } from './context/AuthProvider';
import { PatientProvider } from './context/PatientsProvider';
import { EditProfile } from './pages/EditProfile';
import { ChangePassword } from './pages/ChangePassword';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading } = useAuth();

  if (loading)
    return (
      <p className="text-3xl my-auto text-green-900 font-black">
        Loading... AppRouter
      </p>
    );

  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <PatientProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm/:token" element={<ConfirmAccount />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="reset-password/:token" element={<NewPassword />} />
          </Route>

          <Route path="/admin" element={<PrivateRoute />}>
            <Route index element={<PatientManagement />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </PatientProvider>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
