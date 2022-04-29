import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { axiosClient } from '../config/axios';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password)
      return setAlerta({
        msg: 'Todos los campos son obligatorios!',
        error: true,
      });

    if (password.length < 6)
      return setAlerta({
        msg: 'El password debe tener almenos 6 caracteres!',
        error: true,
      });

    try {
      const { data } = await axiosClient.post('/veterinarians/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);

      // No hace falta que el back retorne el user xq con q tenga el uid en el global state ya funciona el Navigate del Public Router. Esto NO es Inseguro xq en cada pagina se valida el TOKEN, no el uid, de hecho este depende del token. But con todo lo retorne
      // Mejorar el codigo
      setAuth({
        uid: data.user.uid,
        name: data.user.name,
        web: data.user.web,
        phone: data.user.phone,
        email: data.user.email,
      });

    } catch (error) {
      return setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion y Administra tus{' '}
          <span className="text-black block">Pacientes</span>
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
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold mt-9">
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

          <input
            type="submit"
            value="Log In"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-9 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/register">
            No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/reset-password"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};
