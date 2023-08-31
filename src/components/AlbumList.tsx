import { Link } from 'react-router-dom';
import { AlbumListTypes } from '../types';

export default function AlbumList({ searchResult, resultNotFound }: AlbumListTypes) {
  return (resultNotFound ? (
    <span>Nenhum álbum foi encontrado</span>
  ) : (
    <ul>
      {searchResult.map((album) => {
        return (
          <li key={ album.collectionId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              {album.collectionName}
            </Link>
          </li>
        );
      })}
    </ul>
  ));
}
