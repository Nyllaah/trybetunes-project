import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default function Login() {
  const navigate = useNavigate();
  const [nameIpt, setNameIpt] = useState({ name: '' });
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setNameIpt({ name: value });
    return value.length >= 3 ? setDisabled(false) : setDisabled(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setIsLoading(true);
    await createUser({ name: nameIpt.name });
    navigate('/search');
  }

  return (
    !isLoading
      ? <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Nome"
          onChange={ handleChange }
          value={ nameIpt.name }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ disabled }
        >
          Entrar

        </button>
      </form>
      : <span>Carregando...</span>
  );
}
