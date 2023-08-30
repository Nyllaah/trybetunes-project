import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default function Login() {
  const navigate = useNavigate();
  // const [name, setName] = useState('');
  const [nameIpt, setNameIpt] = useState({ name: '' });
  const [disabled, setDisabled] = useState(true);

  // por que o estado name nao funciona nesse caso?
  //   function validation() {
  //     if (name.length >= 3) {
  //       setDisabled(false);
  //     }
  //   }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setNameIpt({ name: value });
    return value.length >= 3 ? setDisabled(false) : setDisabled(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    // ver o que fazer aqui
    createUser({ name: nameIpt.name });
    navigate('/search');
    setNameIpt({ name: '' });
  }

  return (
    <form onSubmit={ handleSubmit }/* onChange={ validation } */>
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
  );
}
