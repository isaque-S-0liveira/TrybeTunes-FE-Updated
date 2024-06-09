import { AlbumType } from '../../types';

function AlbumCover({ album }: { album: AlbumType }) {
  return (
    <div className="album-cover">
      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
      <div id="albumCover-collectionName-artistName">
        <h2>{album.collectionName}</h2>
        <span className="d-none d-lg-block">{album.artistName}</span>
      </div>
    </div>
  );
}

export default AlbumCover;
