import usePatients from '../hooks/usePatients.jsx';
import Patient from './Patient.jsx';

const PatientsList = () => {
  const { patients } = usePatients();

  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center mb-5">
            Patients List
          </h2>
          <p className="text-xl mb-10 text-center">
            Manage your{' '}
            <span className="text-indigo-600 font-bold">Patients</span>
          </p>
          {patients.map((patient) => (
            <Patient key={patient._id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center mb-5">No Patients</h2>
          <p className="text-xl mb-10 text-center">
            Start by adding patients and they will{' '}
            <span className="text-indigo-600 font-bold">appear here</span>
          </p>
        </>
      )}{' '}
    </>
  );
};

export default PatientsList;
