import { NavLink } from 'react-router-dom';

type UserComponentProps = {
  className: string;
  isLoading: boolean;
  userName: string;
};

function UserComponent({ className, isLoading, userName }: UserComponentProps) {
  return (
    <NavLink id="nav-link-user" className={ ` ${className} nav-link` } to="/profile">
      <div id="user-container">
        <i id="user-icon" className="bi bi-person-circle" />
        {isLoading && <span id="loading-name">Carregando...</span>}
        <span
          className={ userName.length >= 10 ? 'text-truncate' : '' }
          data-testid="header-user-name"
          id="user-name"
        >
          {userName}
        </span>
      </div>
    </NavLink>
  );
}

export default UserComponent;
