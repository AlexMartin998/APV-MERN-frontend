// Formulario para enviar email y se genere un token para cambiar el pass
// requestRecoveryToken

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();

    setAlerta({});

    if (!email)
      return setAlerta({
        msg: 'El emial es obligatorio',
        error: true,
      });

    try {
      const { data } = await axiosClient.post(
        '/veterinarians/password-recovery',
        {
          email,
        }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas
          <span className="text-black block"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-7 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-9 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Ya tienes una cuenta? Inicia sesion
          </Link>

          <Link className="block text-center my-5 text-gray-500" to="/register">
            No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};
