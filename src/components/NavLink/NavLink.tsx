import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavLink.css';

type NavLinkProps = {
  to: string;
  linkName: string;
  testId: string;
  icon: string;
};

function NavLinkComponent({ to, linkName, testId, icon }: NavLinkProps) {
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
      className={ `nav-link col-4 col-lg-12
      ${active ? 'nav-link-active' : 'nav-link-disabled'}` }
      data-testid={ testId }
      to={ to }
    >
      <div className="nav-link-icon d-none d-lg-block">
        <span>
          <i className={ icon } />
        </span>
      </div>
      <div className="nav-link-name">
        {linkName}
      </div>
    </NavLink>

  );
}

export default NavLinkComponent;
