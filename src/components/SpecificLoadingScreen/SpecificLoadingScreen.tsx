import Loading from '../Loading/Loading';

function SpecificLoadingScreen() {
  return (
    <>
      <div className="d-lg-none">
        <Loading considerHeaderHeight position="absolute" consideredHight="137px" />
      </div>
      <div className="d-none d-lg-flex">
        <Loading considerHeaderHeight consideredHight="225px" />
      </div>
    </>
  );
}

export default SpecificLoadingScreen;
