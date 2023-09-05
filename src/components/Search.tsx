import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';
import AlbumList from './AlbumList';
import Form from './Form';
import '../styles/Search.css';

export default function Search() {
  const [iptValue, setIptValue] = useState<string>('');
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<AlbumType[]>([]);
  const [resultNotFound, setResultNotFound] = useState<boolean>(false);

  const handleSearchBtn = async (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const foundAlbums = await searchAlbumsAPI(iptValue);
    setSearchResult(foundAlbums);
    setResultNotFound(foundAlbums.length === 0);

    setCurrentSearch(iptValue);
    setIptValue('');
    setShowSearchResult(true);
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="search">
      <div className="form-container">
        <Form
          onSubmit={ handleSearchBtn }
          iptType="text"
          iptTestId="search-artist-input"
          inputValue={ iptValue }
          onChange={ ({ target }) => setIptValue(target.value) }
          btnTestId="search-artist-button"
          disabled={ iptValue.length < 2 }
          btnText="Pesquisar"
          iptClass="search-input"
          btnClass="search-btn"
          placeholder="Nome do artista"
        />
      </div>
      <div className="result-container">
        {showSearchResult && (<span>{`Resultado de álbuns de: ${currentSearch}`}</span>)}

        <AlbumList searchResult={ searchResult } resultNotFound={ resultNotFound } />
      </div>
    </div>
  );
}
