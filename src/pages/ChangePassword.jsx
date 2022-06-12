import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const ChangePassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
    repeat_new_password: '',
  });

  const { savePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some((field) => field === '')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }

    if (password.new_password.length < 6) {
      setAlert({
        msg: 'The new password must have at least 6 characters',
        error: true,
      });
      return;
    }

    if (password.new_password !== password.repeat_new_password) {
      setAlert({
        msg: 'New Password not match',
        error: true,
      });
      return;
    }

const result = await  savePassword(password);

    setAlert(result);
  };


  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modify your {''}
        <span className="text-indigo-600 font-bold">Password</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full mx-4 lg:w-2/5 bg-white shadow rouhded-lg p-5">
          {msg && <Alert alert={alert} />}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="my-4">
              <label
                htmlFor="current_password"
                className="font-bold text-gray-600"
              >
                Current Password
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="password"
                id="current_password"
                placeholder="Type your current password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <label htmlFor="new_password" className="font-bold text-gray-600">
                New Password
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="password"
                id="new_password"
                placeholder="Type your New password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="repeat_new_password"
                className="font-bold text-gray-600"
              >
                Repeat your New Password
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="password"
                id="repeat_new_password"
                placeholder="Repeat your new password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Save Changes"
              className="bg-indigo-700 px-10 py-4 my-3 font-bold text-white rounded-lg w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
