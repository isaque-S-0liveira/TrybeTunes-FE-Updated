type AlbumImgProps = {
  artworkUrl100: string;
  display: string;
};

function AlbumImg({ artworkUrl100, display }: AlbumImgProps) {
  return (
    <div className={ display }>
      <img
        id="album-img"
        src={ artworkUrl100 }
        alt="album img"
        className={
      `${artworkUrl100 === '' ? 'd-none' : 'd-inline'} `
      }
      />
    </div>
  );
}

export default AlbumImg;
