import usePatients from '../hooks/usePatients';

const Patient = ({ patient }) => {
  const { _id, name, owner, email, date, symptom } = patient;

  const { setEdit, deletePatient } = usePatients();

  const formatDate = (date) => {
    const newDate = new Date(date);

    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
      newDate
    );
  };

  return (
    <>
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold text-indigo-600">
          Name:{' '}
          <span className="font-normal normal-case text-black">{name}</span>
        </p>
        <p className="font-bold text-indigo-600">
          Owner:{' '}
          <span className="font-normal normal-case text-black">{owner}</span>
        </p>
        <p className="font-bold text-indigo-600">
          Email:{' '}
          <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold text-indigo-600">
          Discharge Date:{' '}
          <span className="font-normal normal-case text-black">
            {formatDate(date)}
          </span>
        </p>
        <p className="font-bold text-indigo-600">
          Symptoms:{' '}
          <span className="font-normal normal-case text-black">{symptom}</span>
        </p>
        <div className="flex justify-between mt-5">
          <button
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
            type="button"
            onClick={() => setEdit(patient)}
          >
            Edit
          </button>
          <button
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
            type="button"
            onClick={() => deletePatient(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Patient;
