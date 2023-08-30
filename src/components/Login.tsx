import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length >= 3) {
      setDisabled(false);
      navigate('/search');
    }
  }
  return (
    <form onSubmit={ handleSubmit }>
      <input type="text" data-testid="login-name-input" placeholder="Nome" />
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
