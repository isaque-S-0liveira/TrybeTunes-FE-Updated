import MusicCard from '../../components/MusicCard/MusicCard';
import { SongType } from '../../types';

function FavoritesSongs({ favoriteSongs }: { favoriteSongs: SongType[] }) {
  if (favoriteSongs.length !== 0) {
    return (
      <div>
        {favoriteSongs.map((song, i) => (
          <MusicCard
            key={ i }
            idCss="music-card-favorite"
            artworkUrl100={ song.artworkUrl100 }
            musicName={ song.trackName }
            musicPreview={ song.previewUrl }
            trackId={ song.trackId }
            favoriteSongs={ favoriteSongs }
          />
        ))}
      </div>
    );
  }
  return (
    <h3 className="empty-favorites mt-5">Não há músicas favoritas</h3>
  );
}

export default FavoritesSongs;
