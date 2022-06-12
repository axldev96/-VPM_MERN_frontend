import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return 'Loading';
  }

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mt-10 mx-auto">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default PrivateRoutes;
