import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { AlbumType, SongType } from '../types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default function Album() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<AlbumType>();
  const [favList, setFavList] = useState<SongType[]>([]);
  // const [favorited, setFavorited] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getSongs() {
      setIsLoading(true);
      const [currentAlbum, ...songs] = await getMusics(id as string);
      setSongList(songs);
      setAlbum(currentAlbum);
      const data = await getFavoriteSongs();
      setFavList(data);
      setIsLoading(false);
      console.log('envoquei');
    }

    getSongs();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 data-testid="artist-name">{album?.artistName}</h1>
      <h2 data-testid="album-name">{album?.collectionName}</h2>
      {songList.map((song) => {
        const isFav = favList.some((favSong) => favSong.trackId === song.trackId);
        return (<MusicCard
          key={ song.trackId }
          song={ song }
          isFavorited={ isFav }
        />);
      })}
    </>
  );
}
