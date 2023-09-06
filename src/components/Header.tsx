import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../images/logo.svg';
import lupa from '../images/lupa.svg';
import star from '../images/icon-star-empty.svg';
import profileIcon from '../images/icon-profile.svg';
import LoadingMsg from './LoadingMsg';

export default function Header() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      setIsLoading(true);
      const data = await getUser();
      setUsername(data.name);
      setIsLoading(false);
    };
    getUsername();
  }, []);

  return (
    <header data-testid="header-component">
      <img className="logo" src={ logo } alt="logo" />
      <nav>
        <div>
          <img src={ lupa } alt="lupa" />
          <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
        </div>
        <div>
          <img src={ star } alt="estrela" />
          <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        </div>
        <div>
          <img src={ profileIcon } alt="perfil" />
          <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
        </div>
      </nav>
      {isLoading ? (
        <div className="loading-div">
          <LoadingMsg
            containerStyle="header-loading-container"
            spinnerStyle="header-spinner"
            msgStyle="header-loading-msg"
          />
        </div>
      ) : (
        <span className="username" data-testid="header-user-name">
          <span>Olá, </span>
          {username}
        </span>
      )}

    </header>
  );
}
