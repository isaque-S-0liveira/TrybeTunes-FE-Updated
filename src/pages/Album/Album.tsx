import { useParams } from 'react-router-dom';
import './Album.css';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import AlbumCover from './AlbumCover';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

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
      <article id="album-main-container" className="container-lg primary-bg-color">
        <div className="row">
          <div id="songs-header" className="col-12 col-md-5">
            {requestError && <p>{requestError}</p>}
            <div className="d-md-none">
              <AlbumCover album={ collection as AlbumType } />
            </div>
            <div className="d-none d-md-block">
              <AlbumCard album={ collection as AlbumType } />
            </div>
          </div>
          <div id="all-songs-container" className="col-12 col-md-7 p-0">
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
    );
  }
  return <Loading considerHeaderHeight />;
}

export default Album;
