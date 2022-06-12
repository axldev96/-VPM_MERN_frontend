import { useState } from 'react';
import Alert from './Alert';
import usePatients from '../hooks/usePatients';
import { useEffect } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptom, setSymptom] = useState('');
  const [id, setId] = useState('');

  const [alert, setAlert] = useState({});

  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptom(patient.symptom);
      setId(patient._id);
    }
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, owner, email, date, symptom].includes('')) {
      setAlert({
        msg: 'All fileds are required',
        error: true,
      });
      return;
    }

    savePatient({
      name,
      owner,
      email,
      date,
      symptom,
      id,
    });

    setAlert({ msg: 'Saved Correctly', error: false });

    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptom('');
    setId('');
  };

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-3xl text-center mb-5">Patients Manager</h2>
      <p className="text-xl text-center">
        Add Patients to{' '}
        <span className="text-indigo-600 font-bold">Your List</span>
      </p>

      {msg && <Alert alert={alert} />}

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white py-10 px-5 rounded-md mb-10 lg:mb-0 shadow-md mt-5"
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 font-bold">
            Pet Name
          </label>
          <input
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="name"
            placeholder="Pet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 font-bold">
            Owner Name
          </label>
          <input
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="owner"
            placeholder="Owner Name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold">
            Owner Email
          </label>
          <input
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            placeholder="Owner Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 font-bold">
            Discharge Date
          </label>
          <input
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-gray-700 font-bold">
            Symptoms
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe the symptoms"
            id="symptoms"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? 'Save Changes' : 'Add Patient'}
          className="bg-indigo-600 w-full p-3 text-white font-bold
          hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
        />
      </form>
    </>
  );
};

export default Form;
