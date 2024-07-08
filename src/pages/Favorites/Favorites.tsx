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
    return () => {};
  }, [favoriteSongs]);

  if (!isLoading) {
    return (
      <main>
        <HeaderViewer
          viewer={
            <h3 className="favorites-header">Músicas Favoritas</h3>
          }
        />

        <FavoritesSongs favoriteSongs={ favoriteSongs } />
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
