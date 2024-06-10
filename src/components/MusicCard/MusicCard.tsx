import { useEffect, useState } from 'react';
import './MusicCard.css';
import Img from '../Imagem';
import empty_heart from '../../assets/empty_heart.png';
import checked_heart from '../../assets/checked_heart.png';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';
import { SongType } from '../../types';

type MusicCardProps = {
  musicName: string;
  musicPreview: string;
  trackId: number;
  favoriteSongs: SongType[];
};

function MusicCard({ musicName, musicPreview, trackId, favoriteSongs }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
    const song = await getMusics(e.target.value) as SongType[];
    if (e.target.checked) {
      addSong(song[0]);
    } else {
      removeSong(song[0]);
    }
  };

  useEffect(() => {
    setIsFavorite(favoriteSongs.some((song) => song.trackId === trackId));
  }, []);

  return (
    <div id="music-container">
      <div id="musicNameContainer" className="default-scrollbar">
        <p>{musicName}</p>
      </div>
      <div id="audio-icon-container">
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
          <Img src={ isFavorite ? checked_heart : empty_heart } alt="favorita" />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
