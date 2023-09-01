import { useState } from 'react';
import { SongType } from '../types';
import './MusicCards.css';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong } from '../services/favoriteSongsAPI';

export default function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [favorited, setFavorite] = useState(false);

  function handleFavorite() {
    // addSong(e.tar);
    setFavorite(!favorited);
  }

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
        checked={ favorited }
        onChange={ handleFavorite }
        type="checkbox"
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
