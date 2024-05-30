import { AlbumType } from '../../types';

function AlbumCover({ album }: { album: AlbumType }) {
  return (
    <div className="album-cover">
      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
      <h2>{album.collectionName}</h2>
    </div>
  );
}

export default AlbumCover;
