/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
import { getUser } from '../../services/userAPI';
import NavLinkComponent from '../NavLink/NavLink';
import './Header.css';
import UserComponent from './User';

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const request = async () => {
      const user = await getUser();
      if (user.name.length < 3 || user.name === undefined) {
        navigate('/');
      }
      if (user) {
        setUserName(user.name);
      }
      setIsLoading(false);
    };
    request();
  }, []);

  return (
    <header id="header-component" className="">
      <div id="header-container" className="">
        <Link to="/search">
          <img id="header-logo" src={ logo } alt="logo" />
        </Link>
        <UserComponent className="d-lg-none" isLoading={ isLoading } userName={ userName } />
      </div>

      <nav id="navegation" className="container-fluid ">
        <div className="row">

          <NavLinkComponent to="/search" linkName="Pesquisa" icon="bi bi-search" testId="link-to-search" />

          <NavLinkComponent to="/favorites" linkName="Favoritas" icon="bi bi-star" testId="link-to-favorites" />

          <NavLinkComponent to="/profile" linkName="Perfil" icon="bi-person-circle" testId="link-to-profile" />

        </div>
      </nav>
      <UserComponent className="d-none d-lg-flex" isLoading={ isLoading } userName={ userName } />
    </header>
  );
}
export default Header;
