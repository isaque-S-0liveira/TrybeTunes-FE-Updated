import './UserInfo.css';

type UserInfoProps = {
  name: string;
  email: string;
  description: string;
};

function UserInfo({ name, email, description }: UserInfoProps) {
  return (
    <div id="user-info-main-container">
      <div id="user-info-container">
        <div id="user-info-name-container" className="text-light user-info">
          <p className="user-info-label">Nome:</p>
          <span id="name">{name}</span>
        </div>
        <div id="user-info-email-container" className="text-light user-info">
          <p className="user-info-label">Email:</p>
          {email === '' && <span className="uninformed">Não informado</span>}
          <span id="email">{email}</span>
        </div>
        <div id="user-info-description-container" className="text-light user-info">
          <p className="user-info-label">Descrição:</p>
          <div id="description-info">
            {description === '' && <span className="uninformed">Não informado</span>}
            <p id="description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
