import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container my-20 h-100 mx-auto w-full
        md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
