import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios.js';

const ConfirmAccount = () => {
  const { token } = useParams();
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const confirmAccount = async () => {
      const url = `/veterinarians/confirm/${token}`;
      try {
        const { data } = await axiosClient(url);

        setConfirmedAccount(true);

        setAlert({
          msg: data.msg,
          error: false,
        });
      } catch ({ response }) {
        setAlert({ msg: response.data.msg, error: true });
      }

      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-6xl font-black text-indigo-600">
          Confirm your Account and Start Managing{' '}
          <span className="text-black">your Patients</span>
        </h1>
      </div>

      <div className="text-center px-5 py-10 mt-20 bg-white shadow-lg md:mt-0 rounded-xl">
        {!loading && <Alert alert={alert} />}

        {confirmedAccount && (
          <Link className="block my-5 text-gray-500" to="/">
            Account confirmed successfully, Log in!
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
