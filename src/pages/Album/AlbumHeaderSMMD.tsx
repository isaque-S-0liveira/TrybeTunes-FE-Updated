import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { AlbumType } from '../../types';
import AlbumCover from './AlbumCover';

type AlbumHeaderProps = {
  collection: AlbumType ;
  requestError: string;
};

function AlbumHeaderSMMD({ collection, requestError }: AlbumHeaderProps) {
  return (
    <div id="album-header" className="col-12 col-md-5 d-lg-none">
      {requestError && <p>{requestError}</p>}
      <div className="d-md-none">
        <AlbumCover album={ collection as AlbumType } />
      </div>
      <div className="d-none d-md-block d-lg-none">
        <AlbumCard album={ collection as AlbumType } />
      </div>
    </div>
  );
}

export default AlbumHeaderSMMD;
