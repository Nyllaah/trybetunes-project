import { useState, useEffect } from 'react';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

export default function ProfileEdit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      const userInfo = await getUser();
      setUser(userInfo);
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Profile Edit</h1>
      <form action="">
        <input type="text" placeholder={ user?.name } data-testid="edit-input-name" />
        <input type="text" placeholder={ user?.email } data-testid="edit-input-email" />
        <input
          type="text"
          placeholder={ user?.description }
          data-testid="edit-input-description"
        />
        <input type="text" placeholder={ user?.image } data-testid="edit-input-image" />
      </form>
    </>
  );
}
