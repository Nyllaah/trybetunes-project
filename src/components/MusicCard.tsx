import './MusicCards.css';
import { useState } from 'react';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { MusicCardTypes } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default function MusicCard({
  song, isFavorited, handleLoading }: MusicCardTypes) {
  const { trackId, trackName, previewUrl } = song;
  const [favorited, setFavorited] = useState(isFavorited);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { checked } } = e;
    if (handleLoading) {
      handleLoading(true);
    }
    setFavorited(checked);
    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    if (handleLoading) {
      handleLoading(false);
    }
  };

  return (
    <>
      <p>{trackName}</p>
      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <img src={ favorited ? checkedHeart : emptyHeart } alt="favorite" />
      </label>
      <input
        type="checkbox"
        onChange={ handleChange }
        checked={ favorited }
        id={ `checkbox-music-${trackId}` }
        className="favorite-btn"
      />

      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </>
  );
}
