import { useState } from 'react';
import './MusicCards.css';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { MusicCardTypes } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default function MusicCard({ song }: MusicCardTypes) {
  const [favorited, setFavorite] = useState(false);

  function addRemoveFavorite() {
    if (favorited) {
      addSong(song);
    } else {
      removeSong(song);
    }
  }

  addRemoveFavorite();

  const { trackId, trackName, previewUrl } = song;

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
        onChange={ () => setFavorite(!favorited) }
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
