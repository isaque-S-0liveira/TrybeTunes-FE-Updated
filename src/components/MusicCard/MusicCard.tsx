import { useEffect, useState } from 'react';
import './MusicCard.css';
import Img from '../Imagem';
import empty_heart from '../../assets/empty_heart.png';
import checked_heart from '../../assets/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';
import { SongType } from '../../types';
import AlbumImg from './AlbumImg';
import SpinnerLoading from '../Loading/SpinnerLoading';
import CheckedOrEmptyHeart from './CheckedOrEmptyHeart';

type MusicCardProps = {
  idCss: string;
  musicName: string;
  musicPreview: string;
  trackId: number;
  favoriteSongs: SongType[];
  artworkUrl100?: string;
};

function MusicCard({
  idCss,
  musicName,
  musicPreview,
  trackId,
  favoriteSongs,
  artworkUrl100 = '' }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);

  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
    const song = await getMusics(e.target.value) as SongType[];
    if (e.target.checked) {
      await addSong(song[0]);
      setLoadingFavorites(false);
    } else {
      setLoadingFavorites(true);
      await removeSong(song[0]);
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    setIsFavorite(favoriteSongs.some((song) => song.trackId === trackId));
    setLoadingFavorites(false);
  }, []);

  return (
    <div id={ idCss } className="music-container">
      <AlbumImg artworkUrl100={ artworkUrl100 } display="d-none d-md-inline" />
      <div id="musicNameContainer" className="default-scrollbar">
        <span>{musicName}</span>
      </div>
      <div id="audio-icon-container">
        <AlbumImg artworkUrl100={ artworkUrl100 } display="d-md-none" />
        <audio data-testid="audio-component" src={ musicPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          id={ trackId.toString() }
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          className="d-none"
          checked={ isFavorite }
          onChange={ handleChange }
          value={ trackId }
        />
        <label htmlFor={ trackId.toString() }>
          {loadingFavorites ? (
            <SpinnerLoading />
          ) : (
            <CheckedOrEmptyHeart checked={ isFavorite } />
          )}
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
