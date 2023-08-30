import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  // por que o estado name nao funciona nesse caso?
  //   function validation() {
  //     if (name.length >= 3) {
  //       setDisabled(false);
  //     }
  //   }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
    return value.length >= 3 ? setDisabled(false) : setDisabled(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setName('');
    navigate('/search');
  }
  return (
    <form onSubmit={ handleSubmit }/* onChange={ validation } */>
      <input
        type="text"
        data-testid="login-name-input"
        placeholder="Nome"
        onChange={ handleChange }
        value={ name }
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
