import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Button from '../../components/Forms/Button';
import Input from '../../components/Forms/Input';
import Loading from '../../components/Loading/Loading';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import './Search.css';

function Search() {
  const [search, setSearch] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value.length < 2) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  const handleSearchButton = async () => {
    try {
      setIsLoading(true);
      setAlbums(await searchAlbumsAPI(search));
      setSearch('');
      setDisabled(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setHeaderText('erro ao buscar os álbuns');
      setSearch('');
      setDisabled(true);
      setIsLoading(false);
    }
  };

  const hasAlbums = () => {
    if (albums.length > 0) {
      setHeaderText(`Álbuns de ${albums[0].artistName}`);
    } else {
      setHeaderText('Nenhum álbum encontrado');
    }
  };

  useEffect(() => {
    hasAlbums();
  }, [albums]);

  useEffect(() => {
    if (albums.length === 0) {
      setHeaderText('Pesquise sua banda ou artista favorito!');
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && search.length >= 2) {
      handleSearchButton();
    }
  };

  if (!isLoading) {
    return (
      <section className=" mt-4 p-0 container-fluid">

        <form id="search-form">

          <div id="input-search-container" className="position-relative">
            <Input
              id="search-artist-input"
              testId="search-artist-input"
              placeholder="Nome do artista"
              onChange={ handleSearch }
              enterClick={ handleKeyDown }
              value={ search }
            />
            <i className="bi bi-search text-primary " />
          </div>

          <Button
            testId="search-artist-button"
            type="button"
            disabled={ disabled }
            containerClassName=""
            btnClassName="primary-btn"
            onClick={ handleSearchButton }
          >
            Procurar
          </Button>

        </form>

        <div
          id="section-albums"
          className="primary-bg-color mt-3 mt-md-4 container-fluid"
        >
          <div id="section-albums-header" className="col-12">
            <h3
              className="text-center text-light"
            >
              {headerText}
            </h3>

          </div>

          <div id="all-albums-container" className="row">
            {albums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
                className="mb-5 col-4 col-sm-4 col-xl-3"
              >
                <AlbumCard
                  album={ album }
                />

              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <Loading considerHeaderHeight />
  );
}

export default Search;
