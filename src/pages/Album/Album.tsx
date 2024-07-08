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

function Album() {
  const params = useParams();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [collection, setCollection] = useState<AlbumType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');

  const fetchMusics = async () => {
    try {
      const albumAndSongs = await getMusics(params.id as string);
      const album = albumAndSongs[0];
      const remainingMusics = albumAndSongs.slice(1);
      setCollection(album as AlbumType);
      setMusics(remainingMusics as SongType[]);
    } catch (error) {
      setRequestError('Erro ao buscar as músicas');
      setIsLoading(false);
    }
  };

  const fetchFavoriteSongs = async () => {
    setFavoriteSongs(await getFavoriteSongs());
  };

  useEffect(() => {
    fetchFavoriteSongs();
    fetchMusics();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (!isLoading) {
    return (
      <main id="album-page">
        <HeaderViewer viewer={ <AlbumCover album={ collection as AlbumType } /> } />
        <article id="album-main-container" className="container-fluid primary-bg-color">
          <div className="row">
            <AlbumHeaderSMMD
              collection={ collection as AlbumType }
              requestError={ requestError }
            />
            <div id="all-songs-container" className="col-12 col-md-7 col-lg-8 p-0">
              {musics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  idCss="music-card-album"
                  musicName={ music.trackName }
                  musicPreview={ music.previewUrl }
                  trackId={ music.trackId }
                  favoriteSongs={ favoriteSongs }
                  // collectionId={ collection?.collectionId }
                />
              ))}
            </div>
          </div>
        </article>
      </main>
    );
  }
  return (
    <>
      <HeaderViewer viewer={ <div id="loading-headerViewer">Carregando...</div> } />
      <SLS />
    </>
  );
}

export default Album;
