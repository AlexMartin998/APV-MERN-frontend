import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes(''))
      return setAlerta({ msg: 'Hay campos vacios', error: true });

    if (password !== repeatPassword)
      return setAlerta({ msg: 'Los passwords no son iguales', error: true });

    if (password.length < 6)
      return setAlerta({
        msg: 'El password debe ser de al menos 6 caracteres',
        error: true,
      });

    setAlerta({});

    // Crear el user en DB
    try {
      await axiosClient.post('/veterinarians', { name, email, password });

      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu email',
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.errors[0].msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra
          <span className="text-black block"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-7 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              autoComplete="off"
              autoFocus={true}
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              // autoComplete="off"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="repeatPassword"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Sing Up"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-9 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Ya tienes una cuenta? Inicia sesion
          </Link>

          <Link
            to="/reset-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};
