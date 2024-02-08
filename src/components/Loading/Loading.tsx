import './Loading.css';

type LoadingProps = {
  height?: string;
};

function Loading({ height = '100vh' }: LoadingProps) {
  return (
    <div
      style={ { height } }
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
