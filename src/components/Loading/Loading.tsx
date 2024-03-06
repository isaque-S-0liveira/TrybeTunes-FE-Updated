import './Loading.css';

type LoadingProps = {
  considerHeaderHeight: boolean;
};

function Loading({ considerHeaderHeight }: LoadingProps) {
  return (
    <div
      style={ { height: considerHeaderHeight ? 'calc(100% - 133.84px)' : '100%' } }
      data-testid="loading-container-id"
      className="loading-container primary-bg-color"
    >
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
