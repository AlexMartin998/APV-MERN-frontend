import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Alert } from './../components/Alert';
import { axiosClient } from './../config/axios';

export const ConfirmAccount = () => {
  const { token } = useParams();

  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const checkToken = async () => {
      try {
        const url = `/veterinarians/confirm/${token}`;
        const { data } = await axiosClient(url);

        setConfirmedAccount(true);

        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        console.log('error');
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        setConfirmedAccount(false);
      }

      setLoading(false);
    };

    return () => {
      checkToken();
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar
          <span className="text-black block"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-7 py-10 rounded-xl bg-white">
        {loading && (
          <p className="block text-center my-5 text-gray-900">Loading...</p>
        )}

        {!loading && <Alert alerta={alerta} />}

        {confirmedAccount && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Log in
          </Link>
        )}
      </div>
    </>
  );
};
