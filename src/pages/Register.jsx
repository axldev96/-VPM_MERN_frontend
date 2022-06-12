import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, confirmPassword].includes('')) {
      setAlert({ msg: 'Please fill all the fields', error: true });

      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'Password must be at least 6 characters long',
        error: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ msg: 'Passwords do not match', error: true });
      return;
    }

    setAlert({ msg: '', error: false });

    // create user

    try {
      await axiosClient.post('/veterinarians', { name, email, password });
      setAlert({
        msg: 'User created successfully. Check your email for verification',
        error: false,
      });
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch ({ response }) {
      setAlert({ msg: response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-6xl font-black text-indigo-600">
          Create your Account and Manage{' '}
          <span className="text-black">your Patients</span>
        </h1>
      </div>

      <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-0 rounded-xl">
        {msg && <Alert alert={alert} />}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="my-5">
            <label className="block text-2xl font-bold text-gray-600">
              Name
            </label>
            <input
              className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="block text-2xl font-bold text-gray-600">
              Email
            </label>
            <input
              className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="block text-2xl font-bold text-gray-600">
              Password
            </label>
            <input
              className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="block text-2xl font-bold text-gray-600">
              Confirm Password
            </label>
            <input
              className="w-full p-3 mt-3 border bg-gray-50 rounded-xl rounded-xlword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Register"
            className="w-full px-10 py-3 mt-5 text-xl font-bold text-white
            bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer rounded-xl
          md:w-auto"
          />
        </form>

        <nav className="mt-10 text-center lg:flex lg:justify-between">
          <Link className="block my-5 text-gray-500" to="/">
            You have an account? Log in
          </Link>
          <Link
            className="block my-5 text-center text-gray-500"
            to="/forget-password"
          >
            I forgot my password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
