import Img from '../Imagem';
import './AlbumCard.css';

type AlbumProps = {
  album: {
    collectionName: string;
    artistName: string;
    artworkUrl100: string;
  },
};

function AlbumCard({ album }: AlbumProps) {
  const { collectionName, artistName, artworkUrl100 } = album;
  return (
    <div id="album-container">
      <Img
        src={ artworkUrl100 }
        alt={ collectionName }
        containerClass="img-container"
      />
      <p id="albumName">{collectionName}</p>
      <p id="artistName">{artistName}</p>
    </div>
  );
}

export default AlbumCard;
