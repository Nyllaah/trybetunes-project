import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { UserType } from '../types';

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Profile</h1>
      <img src={ user?.image } alt="profile" data-testid="profile-image" />
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.description}</p>

      <Link to="/profile/edit">Editar perfil</Link>
    </>

  );
}
