import { useEffect, useState } from 'react';
import './HeaderViewer.css';

function HeaderViewer({ viewer }: { viewer: JSX.Element }) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    isLargeScreen && (
      <header id="header-lg-viewer">
        {viewer}
      </header>
    )
  );
}

export default HeaderViewer;
