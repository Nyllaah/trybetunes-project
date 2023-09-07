import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import LoadingMsg from './LoadingMsg';
import MusicCard from './MusicCard';
import { AlbumType, SongType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

export default function Album() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<AlbumType>();
  const [favList, setFavList] = useState<SongType[]>([]);
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
      console.log('chamou');
    }

    getSongs();
  }, [id]);

  return (
    <div className="album-page">
      {isLoading ? (
        <LoadingMsg
          containerStyle="album-loading-container"
          msgStyle="search-loading-msg"
          spinnerStyle="spinner-page"
        />
      ) : (
        <>
          <div className="title-container">
            <img className="album-img" src={ album?.artworkUrl100 } alt="album arte" />
            <div>
              <h1
                className="album-name-2"
                data-testid="album-name"
              >
                {album?.collectionName}

              </h1>
              <h2
                className="artist-name-2"
                data-testid="artist-name"
              >
                {album?.artistName}

              </h2>
            </div>
          </div>
          <div className="songs-container">
            <div className="album-list-container">
              {songList.map((song) => {
                const isFav = favList.some((favSong) => favSong.trackId === song.trackId);
                return (<MusicCard
                  key={ song.trackId }
                  song={ song }
                  isFavorited={ isFav }
                />);
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
