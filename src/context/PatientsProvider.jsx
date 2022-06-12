import { createContext, useState, useEffect } from 'react';
import axiosClient from '../config/axios';

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient('/patients', config);

        setPatients([...data]);
      } catch ({ response }) {
        console.log(response.data.msg);
      }
    };
    getPatients();
  }, [patient]);

  const savePatient = async (patient) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (patient.id) {
      try {
        const { data } = await axiosClient.put(
          `/patients/${patient.id}`,
          patient,
          config
        );

        const patientsUpdated = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState
        );

        setPatients(patientsUpdated);
      } catch ({ response }) {
        console.log(response.data.msg);
      }
    } else {
      try {
        const { data } = await axiosClient.post('/patients', patient, config);

        const { createdAt, updatedAt, __v, ...savedPatient } = data;

        setPatients([savedPatient, ...patients]);
      } catch ({ response }) {
        console.log(response.data.msg);
      }
    }
  };

  const setEdit = (patient) => {
    setPatient(patient);
  };

  const deletePatient = async (id) => {
    console.log(id);
    const confirmDelete = confirm('Are you sure to remove this?');

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axiosClient.delete(`/patients/${id}`, config);

      const patientsUpdated = patients.filter(
        (patientState) => patientState._id !== id
      );

      setPatients(patientsUpdated);
    } catch ({ response }) {
      console.log(response.data.msg);
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        setEdit,
        patient,
        deletePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsProvider };

export default PatientsContext;
