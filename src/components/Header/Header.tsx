/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import logo from '/logo.png';
import { getUser } from '../../services/userAPI';
import NavLinkComponent from './NavLink';
import './Header.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const request = async () => {
      const user = await getUser();
      if (user) {
        setUserName(user.name);
      }
      setIsLoading(false);
    };
    request();
  }, []);
  return (
    <header id="header-component">
      <div id="header-container" className="d-flex justify-content-between align-items-center">
        <img id="header-logo" src={ logo } alt="logo" />

        <div id="user-container">
          <i id="user-icon" className="bi bi-person-circle" />
          {isLoading && <span id="loading-name">Carregando...</span>}
          <span
            className={ userName.length >= 10 ? 'd-inline-block text-truncate' : '' }
            data-testid="header-user-name"
            id="user-name"
          >
            {userName}
          </span>
        </div>
      </div>

      <nav id="navBar" className="container-fluid ">
        <div className="row">

          <NavLinkComponent to="/search" linkName="Pesquisa" testId="link-to-search" />

          <NavLinkComponent to="/favorites" linkName="Favoritas" testId="link-to-favorites" />

          <NavLinkComponent to="/profile" linkName="Perfil" testId="link-to-profile" />

        </div>
      </nav>
    </header>
  );
}
export default Header;
