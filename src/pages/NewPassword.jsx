import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/veterinarians/forget-password/${token}`);
        setAlert({
          msg: 'Enter your new Password',
        });
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: 'Link Error',
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
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

    try {
      const url = `veterinarians/forget-password/${token}`;
      const { data } = await axiosClient.post(url, { password });

      setAlert({
        msg: data.msg,
      });

      setModifiedPassword(true);
      setValidToken(false);
    } catch ({ response }) {
      setAlert({ msg: response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-6xl font-black text-indigo-600">
          Reset your Password and do not Lose Access to{' '}
          <span className="text-black">your Patients</span>
        </h1>
      </div>

      <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-0 rounded-xl">
        {msg && <Alert alert={alert} />}

        {modifiedPassword && (
          <nav className="mt-10 text-center lg:flex lg:justify-center">
            <Link className="block my-5 text-gray-500" to="/">
              Log in
            </Link>
          </nav>
        )}

        {validToken && (
          <>
            <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
              <div className="my-5">
                <label className="block text-2xl font-bold text-gray-600">
                  New Password
                </label>
                <input
                  className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="my-5">
                <label className="block text-2xl font-bold text-gray-600">
                  Repeat Password
                </label>
                <input
                  className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                  type="password"
                  placeholder="Repeat Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Save New Password"
                className="w-full px-10 py-3 mt-5 text-xl font-bold text-white
            bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer rounded-xl
          md:w-auto"
              />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default NewPassword;
