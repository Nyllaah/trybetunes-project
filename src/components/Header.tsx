import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default function Header() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      setIsLoading(true);
      const data = await getUser();
      console.log(data);
      setUsername(data.name);
      setIsLoading(false);
    };
    getUsername();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <header data-testid="header-component">
      <nav>
        <span data-testid="header-user-name">{`Olá, ${username}`}</span>
        <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </nav>
    </header>
  );
}
