import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className='flex gap-3'>
      <Link className="text-xl font-bold text-gray-600" to="/admin/profile">
        Profile
      </Link>
      <Link className="text-xl font-bold text-gray-600" to="/admin/change-password">
        Change Password
      </Link>
    </nav>
  );
};

export default AdminNav;
