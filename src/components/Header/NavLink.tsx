import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type NavLinkProps = {
  to: string;
  linkName: string;
  testId: string;
};

function NavLinkComponent({ to, linkName, testId }: NavLinkProps) {
  const [active, setActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === to) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location]);
  return (
    <NavLink
      className={ `col-4 ${active ? 'nav-link-active' : 'nav-link-container'}` }
      data-testid={ testId }
      to={ to }
    >
      {linkName}
    </NavLink>
  );
}

export default NavLinkComponent;
