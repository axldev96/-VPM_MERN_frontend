import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';
import axiosClient from '../config/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length <= 0) {
      setAlert({
        msg: 'Email Required',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'Password Required',
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/veterinarians/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);

      setAuth(data);
      navigate('/admin');
    } catch ({ response }) {
      setAlert({ msg: response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Login and Manage <span className="text-black">your Patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="my-5">
            <label className="text-gray-600 block text-2xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="text-gray-600 block text-2xl font-bold">
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50
              rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="mt-5 text-xl bg-indigo-700 hover:bg-indigo-800
            hover:cursor-pointer text-white w-full font-bold py-3 px-10
            rounded-xl md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between text-center">
          <Link className="block my-5 text-gray-500" to="/register">
            You don't have an account? Sign up
          </Link>
          <Link
            className="block my-5 text-gray-500 text-center"
            to="/forget-password"
          >
            I forgot my password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
