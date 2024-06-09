import './Loading.css';

type LoadingProps = {
  considerHeaderHeight: boolean;
  consideredHight?: string;
  position?: 'static' | 'absolute' ;

};

function Loading({
  position = 'static',
  considerHeaderHeight,
  consideredHight = '0px',
}: LoadingProps) {
  return (
    <div
      style={ {
        position,
        height: considerHeaderHeight ? `calc(100vh - ${consideredHight})` : '100%' } }
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
