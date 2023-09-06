import { Link } from 'react-router-dom';
import { AlbumListTypes } from '../types';
import '../styles/AlbumList.css';

export default function AlbumList({ searchResult }: AlbumListTypes) {
  return (
    <div className="album-list">
      {searchResult.map((album) => {
        return (
          <div className="album" key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt="" />
            <Link
              className="album-name"
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              {album.collectionName}
            </Link>
            <span className="artist">{album.artistName}</span>
          </div>
        );
      })}
    </div>
  );
}
