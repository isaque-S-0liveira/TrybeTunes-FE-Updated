import { useParams } from 'react-router-dom';
import './Album.css';
import './AlbumCardSongs.css';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../../components/MusicCard/MusicCard';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';
import SLS from '../../components/SpecificLoadingScreen/SpecificLoadingScreen';
import AlbumHeaderSMMD from './AlbumHeaderSMMD';
import AlbumCover from './AlbumCover';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import AlbumError from './AlbumError';

function Album() {
  const params = useParams();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [collection, setCollection] = useState<AlbumType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');

  const fetchMusics = async () => {
    try {
      setIsLoading(true);
      const albumAndSongs = await getMusics(params.id as string);
      if (albumAndSongs.length === 0) {
        throw new Error('Nenhuma música encontrada');
      }

      const album = albumAndSongs[0];
      const remainingMusics = albumAndSongs.slice(1);

      if (!album || !album.collectionName) {
        throw new Error('Dados do álbum estão incompletos');
      }

      setCollection(album as AlbumType);
      setMusics(remainingMusics as SongType[]);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setRequestError(error.message);
        setIsLoading(false);
      } else {
        setRequestError('Erro ao buscar as músicas');
        setIsLoading(false);
      }
    }
  };

  const fetchFavoriteSongs = async () => {
    try {
      const favorites = await getFavoriteSongs();
      setFavoriteSongs(favorites);
    } catch (error) {
      console.error('Erro ao buscar as músicas favoritas:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteSongs();
    fetchMusics();
  }, []);

  if (isLoading) {
    return (
      <>
        <HeaderViewer viewer={ <div id="loading-headerViewer">Carregando...</div> } />
        <SLS />
      </>
    );
  }

  if (requestError) {
    return (
      <AlbumError requestError={ requestError } />
    );
  }

  if (!collection) {
    return (
      <AlbumError />

    );
  }

  return (
    <main id="album-page">
      <HeaderViewer viewer={ <AlbumCover album={ collection } /> } />
      <article id="album-main-container" className="container-fluid primary-bg-color">
        <div className="row">
          <AlbumHeaderSMMD collection={ collection } requestError={ requestError } />
          <div id="all-songs-container" className="col-12 col-md-7 col-lg-8 p-0">
            {musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                idCss="music-card-album"
                musicName={ music.trackName }
                musicPreview={ music.previewUrl }
                trackId={ music.trackId }
                favoriteSongs={ favoriteSongs }
                artworkUrl100={ collection.artworkUrl100 }
              />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

export default Album;
