import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import './Profile.css';
import SLS from '../../components/SpecificLoadingScreen/SpecificLoadingScreen';
import UserInfo from './UserInfo';
import UserIconImg from './UserIconImg';
import Button from '../../components/Forms/Button';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';

function Profile() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const navigateToEditProfile = () => {
    navigate('/profile/edit');
  };
  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getUser());
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (!isLoading) {
    return (
      <>

        <HeaderViewer viewer={ <UserIconImg /> } />

        <main id="main-profile-container" className="row p-0 m-0">
          <div className="col-12 col-md-4 col-lg-5 col-xxl-4">
            <div className="d-lg-none">
              <UserIconImg />
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-7 col-xxl-8">
            <UserInfo
              name={ user.name }
              email={ user.email }
              description={ user.description }
            />

            <Button
              type="button"
              disabled={ false }
              testId="edit-profile-button"
              btnClassName="btn-primary"
              containerClassName="d-flex justify-content-center mb-5"
              onClick={ navigateToEditProfile }
            >
              Editar perfil
            </Button>
          </div>

        </main>
      </>
    );
  }
  return (
    <>
      <HeaderViewer viewer={ <UserIconImg /> } />
      <SLS />
    </>
  );
}

export default Profile;
