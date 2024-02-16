import { useState } from 'react';
import './MusicCard.css';
import Img from '../Imagem';
import empty_heart from '../../assets/empty_heart.png';
import checked_heart from '../../assets/checked_heart.png';

type MusicCardProps = {
  musicName: string;
  musicPreview: string;
  trackId: number;
};

function MusicCard({ musicName, musicPreview, trackId }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
  };
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
          type="checkbox"
          className="d-none"
          checked={ isFavorite }
          onChange={ handleChange }
        />
        <label htmlFor={ trackId.toString() }>
          <Img src={ isFavorite ? checked_heart : empty_heart } alt="favorita" />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
