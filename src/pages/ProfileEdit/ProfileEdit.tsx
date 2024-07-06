import { useEffect, useState } from 'react';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';
import { getUser } from '../../services/userAPI';
import UserIconImg from '../Profile/UserIconImg';
import { UserType } from '../../types';
import SLS from '../../components/SpecificLoadingScreen/SpecificLoadingScreen';
import EditProfileForm from './EditProfileForm';
import './ProfileEdit.css';

function ProfileEdit() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoading, setIsLoading] = useState(true);

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
        <HeaderViewer
          viewer={
            <UserIconImg />
        }
        />
        <main
          id="main-editprofile-container"
          className="row p-0 m-0"
        >
          <div className="col-12 col-md-5 col-xxl-4">
            <div className="d-lg-none">
              <UserIconImg />
            </div>
          </div>
          <div className="col-12 col-md-7 col-xxl-8  p-0 m-0">
            <EditProfileForm user={ user } setIsLoading={ setIsLoading } />
          </div>

        </main>
      </>
    );
  }
  return (
    <>
      <HeaderViewer viewer={ <UserIconImg isEdit={ isLoading } /> } />
      <SLS />
    </>
  );
}

export default ProfileEdit;
