import './HeaderViewer.css';

function HeaderViewer({ viewer }: { viewer: JSX.Element }) {
  return (
    <header id="header-lg-viewer" className="d-none d-lg-block">
      {viewer}
    </header>
  );
}

export default HeaderViewer;
