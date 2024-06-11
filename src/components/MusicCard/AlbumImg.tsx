function AlbumImg({ artworkUrl100 }: { artworkUrl100: string }) {
  return (
    <div className="d-smm-none">
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
