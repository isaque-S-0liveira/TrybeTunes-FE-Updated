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
    const favorites = await getFavoriteSongs();
    setFavoriteSongs(favorites);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteSongs();
  });

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
