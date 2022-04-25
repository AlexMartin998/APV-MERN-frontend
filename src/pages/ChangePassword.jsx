import { useState } from 'react';

import { AdminNav } from '../components/AdminNav';
import { Alert } from '../components/Alert';

import { useAuth } from '../hooks/useAuth';

const initState = {
  currentPassword: '',
  newPassword: '',
};

export const ChangePassword = () => {
  const { updatePassword, logOut } = useAuth();

  const [formValues, setFormValues] = useState(initState);
  const { currentPassword, newPassword } = formValues;
  const [alerta, setAlerta] = useState({});

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(formValues).some(field => !field))
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

    if (newPassword.length < 6)
      return setAlerta({
        msg: 'El password nuevo debe tener minimo 6 caracteres',
        error: true,
      });

    try {
      const { msg } = await updatePassword(formValues);

      setFormValues(initState);
      setAlerta({ msg, error: false });

      setTimeout(() => {
        logOut();
      }, 1200);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{' '}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alerta={alerta} />}

          <form onSubmit={handleSubmit} id="#form-register">
            <div className="my-3">
              <label
                htmlFor="currentPassword"
                className="uppercase font-bold text-gray-600"
              >
                Password Actual
              </label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Password Actual"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="currentPassword"
                value={currentPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="newPassword"
                className="uppercase font-bold text-gray-600"
              >
                Nuevo Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Nuevo Password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="newPassword"
                value={newPassword || ''}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="submit"
              value="Cambiar Password"
              className="bg-indigo-700 cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-7"
            />
          </form>
        </div>
      </div>
    </>
  );
};
