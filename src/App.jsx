import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import PrivateLayout from './layout/PrivateLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import AdminPatients from './pages/AdminPatients';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';

import Test from './components/Test';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          {/* Public Routes */}
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>
            {/* Privete Routes */}
            <Route path="/admin" element={<PrivateLayout />}>
              <Route index element={<AdminPatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="test" element={<Test />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
