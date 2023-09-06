import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import { SongType } from '../types';
import Loading from './LoadingPage';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favList, setFavList] = useState<SongType[]>([]);

  useEffect(() => {
    async function getFav() {
      setIsLoading(true);
      const data = await getFavoriteSongs();
      setFavList(data);
      setIsLoading(false);
    }
    getFav();
  }, []);

  const handleLoading = async (param: boolean) => {
    if (!param) {
      const data = await getFavoriteSongs();
      setFavList(data);
    }
    setIsLoading(param);
  };

  return (
    <>
      <h1>Favorites</h1>
      {isLoading
        ? <Loading />
        : (favList.map((song) => (
          <MusicCard
            key={ song.trackId }
            song={ song }
            isFavorited
            handleLoading={ handleLoading }
          />)))}
    </>
  );
}
