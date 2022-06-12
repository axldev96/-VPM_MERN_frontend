import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  const { logOut } = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to='/admin' className="font-bold text-2xl text-indigo-100 text-center">
          Veterinary Patients{' '}
          <span className="text-white font-black">Manager</span>
        </Link>
        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link className="text-white text-xl" to="/admin">
            Patients
          </Link>
          <Link className="text-white text-xl" to="/admin/profile">
            Profile
          </Link>
          <button onClick={logOut} type="button" className="text-white text-xl">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
