function SpinnerLoading() {
  return (
    <div className="spinner-border  text-light" style={ { width: '3rem', height: '3rem' } } role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default SpinnerLoading;
