import { useState, useEffect } from 'react';
import { usePatients } from '../hooks/usePatients';
import { Alert } from './Alert';

export const Form = () => {
  // Registrar el State con el mismo nombre q tiene el Model del Back
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const [alerta, setAlerta] = useState({});

  const [id, setId] = useState(null);

  const { addPatient, currentPatient } = usePatients();

  useEffect(() => {
    if (currentPatient?.name) {
      setName(currentPatient.name);
      setOwner(currentPatient.owner);
      setEmail(currentPatient.email);
      setDate(currentPatient.date);
      setSymptoms(currentPatient.symptoms);
      setId(currentPatient._id);
    }

    return () => {};
  }, [currentPatient]);

  const handleSubmit = e => {
    e.preventDefault();

    if ([name, owner, email, date, symptoms].includes(''))
      return setAlerta({
        msg: 'Todos los campos son obligatorios!',
        error: true,
      });

    setAlerta({});

    addPatient({ name, owner, email, date, symptoms, id });
    setAlerta({
      msg: 'Actualizado correctamente',
      error: false,
    });

    // TODO: Evitar todo eso ton un custom hook - useForm
    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptoms('');
    setId('');
  };

  const { msg } = alerta;

  return (
    <>
      <h3 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h3>
      <p className="text-xl mt-5 mb-10 text-center">
        Agrega tus pacientes y{' '}
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 shadow-md mb-10 lg:mb-0 rounded-md"
      >
        {msg && <Alert alerta={alerta} />}

        <div className="mb-5">
          <label htmlFor="pet" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="pet"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">
            Propietario
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="owner"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email del Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="symptoms"
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};
