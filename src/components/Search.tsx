/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import AlbumList from './AlbumList';
import Form from './Form';
import '../styles/Search.css';
import LoadingMsg from './LoadingMsg';
import notFound from '../images/not-found.png';

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
          formClass="search-form"
        />
      </div>
      <div className="result-container">
        {isLoading ? (
          <LoadingMsg
            containerStyle="search-loading-container"
            msgStyle="search-loading-msg"
            spinnerStyle="spinner-page"
          />
        ) : (
          resultNotFound ? (
            <div className="not-found-container">
              <img src={ notFound } alt="not found icon" className="nothing-found-icon" />
              <span className="nothing-found-msg">Nenhum álbum foi encontrado</span>
            </div>
          ) : (
            showSearchResult && (
              <>
                <span
                  className="result"
                >
                  {`Resultado de álbuns de: ${currentSearch}`}

                </span>
                <AlbumList
                  searchResult={ searchResult }
                />
              </>
            )
          )
        )}
      </div>
    </div>
  );
}
