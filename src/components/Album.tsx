import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { AlbumType, SongType } from '../types';

export default function Album() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<AlbumType>();
  const { id } = useParams();

  useEffect(() => {
    async function getSongs() {
      setIsLoading(true);
      const [currentAlbum, ...songs] = await getMusics(id as string);
      setSongList(songs);
      setAlbum(currentAlbum);
      setIsLoading(false);
    }
    getSongs();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 data-testid="artist-name">{album?.artistName}</h1>
      <h2 data-testid="album-name">{album?.collectionName}</h2>
      {songList.map(({ trackId, trackName, previewUrl }, index) => {
        return (index !== 0
          && <MusicCard
            key={ trackId }
            trackId={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />
        );
      })}
    </>
  );
}
