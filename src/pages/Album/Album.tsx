import { useParams } from 'react-router-dom';
import './Album.css';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../../components/MusicCard/MusicCard';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';
import SLS from '../../components/SpecificLoadingScreen/SpecificLoadingScreen';
import AlbumHeaderSMMD from './AlbumHeaderSMMD';
import AlbumCover from './AlbumCover';

function Album() {
  const params = useParams();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [collection, setCollection] = useState<AlbumType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');
  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const albumAndSongs = await getMusics(params.id as string);
        const album = albumAndSongs[0];
        const remainingMusics = albumAndSongs.slice(1);
        setCollection(album as AlbumType);
        setMusics(remainingMusics as SongType[]);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setRequestError('Erro ao buscar as músicas');
        setIsLoading(false);
      }
    };
    fetchMusics();
  }, []);

  if (!isLoading) {
    return (
      <div id="album-page">
        <HeaderViewer viewer={ <AlbumCover album={ collection as AlbumType } /> } />
        <article id="album-main-container" className="container-fluid primary-bg-color">
          <div className="row">
            <AlbumHeaderSMMD
              collection={ collection as AlbumType }
              requestError={ requestError }
            />
            <div id="all-songs-container" className="col-12 col-md-7 col-lg-12 p-0">
              {musics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  musicName={ music.trackName }
                  musicPreview={ music.previewUrl }
                  trackId={ music.trackId }
                />
              ))}
            </div>
          </div>
        </article>
      </div>
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
