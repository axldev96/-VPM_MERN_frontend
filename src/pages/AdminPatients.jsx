import { useState } from 'react';
import Form from '../components/Form';
import PatientsList from '../components/PatientsList';

const AdminPatients = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row px-2">
      <button
        type="button"
        className="bg-indigo-600 w-full p-3 text-white font-bold md:w-40
        hover:bg-indigo-700 cursor-pointer transition-colors rounded-md mx-auto
        md:hidden mb-5"
        onClick={() => setShowForm(!showForm)}
      >
        {!showForm ? 'Show Form' : 'Hide Form'}
      </button>
      <div className={`${showForm ? 'block' : 'hidden'} lg:mx-auto md:block md:w-1/2 lg:w-2/5 p-5`}>
        <Form />
      </div>
      <div className="md:w-1/2 lg:mx-auto">
        <PatientsList />
      </div>
    </div>
  );
};

export default AdminPatients;
