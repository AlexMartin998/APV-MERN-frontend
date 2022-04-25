import { usePatients } from '../hooks/usePatients';
import { Patient } from './Patient';

export const PatientList = () => {
  const { patients } = usePatients();

  return (
    <>
      {patients.length ? (
        <>
          <h3 className="font-black text-3xl text-center">
            Lista de Pacientes
          </h3>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus
            <span className="text-indigo-600 font-bold">
              {' '}
              Pacientes y Citas
            </span>
          </p>

          {patients.map(patient => (
            <Patient key={patient._id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h3 className="font-black text-3xl text-center">
            There is not any patient!
          </h3>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes{' '}
            <span className="text-indigo-600 font-bold">
              {' '}
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};
