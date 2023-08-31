import { useState } from 'react';
import { SongType } from '../types';
import './MusicCards.css';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

export default function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [favorited, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorited);
  }

  return (
    <>
      <p>{trackName}</p>
      <label
        htmlFor="favorite-btn"
      >
        <img src={ favorited ? checkedHeart : emptyHeart } alt="favorite" />
        <input
          checked={ favorited }
          onChange={ handleFavorite }
          type="checkbox"
          id="favorite-btn"
          className="favorite-btn"
          data-testid={ `checkbox-music-${trackId}` }
        />

      </label>
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
