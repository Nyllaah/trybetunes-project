import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import Form from './Form';

export default function Login() {
  const navigate = useNavigate();
  const [nameIpt, setNameIpt] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitBtn = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createUser({ name: nameIpt.name });
    navigate('/search');
  };

  return (
    !isLoading
      ? (
        <Form
          onSubmit={ handleSubmitBtn }
          iptType="text"
          iptTestId="login-name-input"
          placeholder="Nome"
          inputValue={ nameIpt.name }
          onChange={ ({ target }) => setNameIpt({ name: target.value }) }
          btnTestId="login-submit-button"
          disabled={ nameIpt.name.length < 3 }
          btnText="Entrar"
        />
      )
      : <Loading />
  );
}
