import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';
import AlbumList from './AlbumList';
// import AlbumList from './AlbumList';

export default function Search() {
  const [iptValue, setIptValue] = useState<string>('');
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<AlbumType[]>([]);
  const [resultNotFound, setResultNotFound] = useState<boolean>(false);

  async function handleSearchBtn(e:React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setIsLoading(true);

    const foundAlbums = await searchAlbumsAPI(iptValue);
    setSearchResult(foundAlbums);
    setResultNotFound(foundAlbums.length === 0);

    setCurrentSearch(iptValue);
    setIptValue('');
    setShowSearchResult(true);
    setIsLoading(false);
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <form onSubmit={ handleSearchBtn }>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ iptValue }
          onChange={ ({ target }) => setIptValue(target.value) }
        />
        <button
          disabled={ iptValue.length < 2 }
          data-testid="search-artist-button"
        >
          Pesquisar

        </button>
      </form>

      {showSearchResult && (<span>{`Resultado de álbuns de: ${currentSearch}`}</span>)}

      <AlbumList searchResult={ searchResult } resultNotFound={ resultNotFound } />
    </>
  );
}
