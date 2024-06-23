import { Link } from 'react-router-dom';

type AlbumImgProps = {
  artworkUrl100: string;
  collectionId: number;
  display: string;
};

function AlbumImg({ artworkUrl100, collectionId, display }: AlbumImgProps) {
  return (
    <div className={ display }>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img
          id="album-img"
          src={ artworkUrl100 }
          alt="album img"
          className={
          `${artworkUrl100 === '' ? 'd-none' : 'd-inline'} `
        }
        />
      </Link>
    </div>
  );
}

export default AlbumImg;
