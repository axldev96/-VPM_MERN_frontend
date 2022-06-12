import { useContext } from 'react';
import PatientsContext from '../context/PatientsProvider.jsx';

const usePatients = () => {
  return useContext(PatientsContext);
};

export default usePatients;
