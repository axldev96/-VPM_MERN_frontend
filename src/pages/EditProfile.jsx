import { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const EditProfile = () => {
  const { auth, updateProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email } = profile;

    if ([name, email].includes('')) {
      setAlert({
        msg: 'Name and Email are required',
        error: true,
      });

      return;
    }

    const result = await updateProfile(profile);
    setAlert(result);
  };

  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modify your {''}
        <span className="text-indigo-600 font-bold">Information</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full mx-4 lg:w-2/5 bg-white shadow rouhded-lg p-5">
          {msg && <Alert alert={alert} />}

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="my-4">
              <label htmlFor="name" className="font-bold text-gray-600">
                Name
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="text"
                id="name"
                value={profile.name || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <label htmlFor="web" className="font-bold text-gray-600">
                Web Site
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="text"
                id="web"
                value={profile.web || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <label htmlFor="phone" className="font-bold text-gray-600">
                Phone Number
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="text"
                id="phone"
                value={profile.phone || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-4">
              <label htmlFor="email" className="font-bold text-gray-600">
                Email
              </label>
              <input
                className="bg-gray-50 border w-full p-2 mt-3 rouhded-lg"
                type="email"
                id="email"
                value={profile.email || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
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

export default EditProfile;
