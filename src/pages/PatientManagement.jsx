import { useState } from 'react';
import { Form } from '../components/Form';
import { PatientList } from '../components/PatientList';

export const PatientManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-5 p-3 rounded-md md:hidden"
      >
        {showForm ? 'Ocultar' : 'Mostrar'} formulario
      </button>

      <div
        className={`${
          showForm ? 'block' : 'hidden'
        } check-this md:w-1/2 lg:w-2/5 md:block`}
      >
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientList />
      </div>
    </div>
  );
};
