import './HeaderViewer.css';

function HeaderViewer({ viewer }: { viewer: JSX.Element }) {
  return (
    <div id="header-lg-viewer" className="d-none d-lg-block">
      {viewer}
    </div>
  );
}

export default HeaderViewer;
