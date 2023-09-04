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
      // setIsLoading(true);
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
      <img src={ user.image } alt="profile" data-testid="profile-image" />
      <div>
        <p>{user.name}</p>
      </div>
      <div>
        <p>{user.email}</p>
      </div>
      <div>
        <p>{user.description}</p>
      </div>
      <Link to="/profile/edit">Editar perfil</Link>
    </>

  );
}
