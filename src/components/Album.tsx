import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { AlbumSongsType, SongType } from '../types';

export default function Album() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<AlbumSongsType>([]);
  const { id } = useParams();

  useEffect(() => {
    async function getSongs() {
      setIsLoading(true);
      const result = await getMusics(id as string);
      setSongList(result);
      setIsLoading(false);
    }
    getSongs();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 data-testid="artist-name">{songList[0]?.artistName}</h1>
      <h2 data-testid="album-name">{songList[0]?.collectionName}</h2>
      {songList.map(({ trackId, trackName, previewUrl }: SongType, index: number) => {
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
