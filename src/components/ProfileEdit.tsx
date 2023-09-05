import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

export default function ProfileEdit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setIsLoading(true);
    await updateUser(user);
    setIsLoading(false);
  }

  const isEmailValid = user.email.length !== 0 && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  function isFormValid() {
    return isEmailValid
    && (user.name.length !== 0)
    && (user.description.length !== 0)
    && (user.image.length !== 0);
  }

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      const userInfo = await getUser();
      setUser(userInfo);
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Profile Edit</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          onChange={ handleChange }
          value={ user.name }
          name="name"
          placeholder="Nome"
          data-testid="edit-input-name"
        />
        <input
          type="text"
          onChange={ handleChange }
          value={ user.email }
          name="email"
          placeholder="Email"
          data-testid="edit-input-email"
        />
        <input
          type="text"
          onChange={ handleChange }
          value={ user.description }
          name="description"
          placeholder="Descrição"
          data-testid="edit-input-description"
        />
        <input
          type="text"
          onChange={ handleChange }
          value={ user.image }
          name="image"
          placeholder="Imagem"
          data-testid="edit-input-image"
        />
        <button
          data-testid="edit-button-save"
          disabled={ !isFormValid() }
          onClick={ () => navigate('/profile') }
        >
          Salvar

        </button>
      </form>
    </>
  );
}
