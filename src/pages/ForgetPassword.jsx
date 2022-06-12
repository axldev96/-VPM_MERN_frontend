import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import axiosClient from '../config/axios.js';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert({ msg: 'Email Required', error: true });
      return;
    }
    try {
      const { data } = await axiosClient.post(
        'veterinarians/forget-password/',
        {
          email,
        }
      );

      setAlert({
        msg: data.msg,
      });
      setEmail('')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recover your Password and do not lose{' '}
          <span className="text-black">your Patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
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

          <input
            type="submit"
            value="Send Instructions"
            className="mt-5 text-xl bg-indigo-700 hover:bg-indigo-800
            hover:cursor-pointer text-white w-full font-bold py-3 px-10
            rounded-xl md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between text-center">
          <Link className="block my-5 text-gray-500" to="/">
            You have an account? Log in
          </Link>
          <Link className="block my-5 text-gray-500" to="/register">
            You don't have an account? Sign up
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgetPassword;
