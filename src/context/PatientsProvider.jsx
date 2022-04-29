import { createContext, useState, useEffect } from 'react';
import { axiosClient } from '../config/axios';

export const PatientsContext = createContext();

const token = localStorage.getItem('token');

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({});

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  // Guardar Paciente en DB
  const addPatient = async patient => {
    if (patient.id) {
      try {
        const { data } = await axiosClient.put(
          `/patients/${patient.id}`,
          patient,
          config
        );

        const updatedPatients = patients.map(patientState => {
          return patientState._id === data.patient._id
            ? data.patient
            : patientState;
        });

        setPatients(updatedPatients);
        setCurrentPatient({});
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      try {
        const { data } = await axiosClient.post('/patients', patient, config);

        setPatients([data.patient, ...patients]);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  // TODO: Limpiar pacientes al hacer logout

  const setEdition = patient => {
    setCurrentPatient(patient);
  };

  const deletePatient = async id => {
    const confirmar = confirm('Confirmas que deseas eliminar?');
    if (!confirmar) return;

    try {
      await axiosClient.delete(`/patients/${id}`, config);
      const deletedPatients = patients.filter(
        patientState => patientState._id !== id
      );

      setPatients(deletedPatients);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // No pasar el  setPatients,  se debe pasar una f(x) q aqui modifique el state
  return (
    <PatientsContext.Provider
      value={{
        patients,
        addPatient,
        setEdition,
        currentPatient,
        deletePatient,
        setPatients,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
