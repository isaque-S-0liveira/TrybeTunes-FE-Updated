import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getUser } from '../../services/userAPI';

type UserComponentProps = {
  className: string;
  isLoading: boolean;
  userName: string;
};

function UserComponent({ className, isLoading, userName }: UserComponentProps) {
  const navigate = useNavigate();
  const { userNameCT, imgCT, setImgCT, setUserNameCT } = useContext(UserContext);

  const redirectToLogin = () => {
    if (userName === '' && userName === undefined) {
      navigate('/');
    }
  };

  const fetchUser = async () => {
    const user = await getUser();
    setImgCT(user.image);
    setUserNameCT(user.name);
  };

  useEffect(() => {
    fetchUser();
    redirectToLogin();
  }, []);

  useEffect(() => {
    return () => {};
  }, [imgCT]);

  return (
    <NavLink id="nav-link-user" className={ ` ${className} nav-link` } to="/profile">
      <div id="user-container">
        <img
          id="user-img"
          src={ imgCT }
          alt="User-img"
          className={ imgCT !== '' && imgCT !== undefined ? 'd-inline' : 'd-none' }
        />

        <div className={ imgCT === '' || imgCT === undefined ? 'd-inline' : 'd-none' }>
          <i id="user-icon" className="bi bi-person-circle" />
        </div>
        {isLoading && <span id="loading-name">Carregando...</span>}
        <span
          className={ userName.length >= 10 ? 'text-truncate' : '' }
          data-testid="header-user-name"
          id="user-name"
        >
          {userNameCT}
        </span>
      </div>
    </NavLink>
  );
}

export default UserComponent;
