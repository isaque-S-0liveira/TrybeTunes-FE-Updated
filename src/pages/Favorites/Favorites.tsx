import { useEffect, useState } from 'react';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import SLS from '../../components/SpecificLoadingScreen/SpecificLoadingScreen';
import './Favorites.css';
import FavoritesSongs from './FavoritesSongs';

function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  const fetchFavoriteSongs = async () => {
    setFavoriteSongs(await getFavoriteSongs());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteSongs();
    console.log(favoriteSongs);
  }, []);

  useEffect(() => {
    fetchFavoriteSongs();
  }, [favoriteSongs]);

  if (!isLoading) {
    return (
      <main>
        <HeaderViewer
          viewer={
            <h3 className="favorites-header">Músicas Favoritas</h3>
          }
        />
        <article
          id="favorites-songs-container"
          className="primary-bg-color default-scrollbar"
        >
          <FavoritesSongs favoriteSongs={ favoriteSongs } />
        </article>
      </main>
    );
  }
  return (
    <>
      <HeaderViewer
        viewer={
          <h3 className="favorites-header">Músicas Favoritas</h3>
          }
      />
      <SLS />
      ;
    </>
  );
}

export default Favorites;
