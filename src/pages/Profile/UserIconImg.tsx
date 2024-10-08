import { useContext, useEffect, useState } from 'react';
import { getUser, updateUser } from '../../services/userAPI';
import SpinnerLoading from '../../components/Loading/SpinnerLoading';
import './UserIconImg.css';
import UserContext from '../../context/UserContext';

type UserIconImgProps = {
  isEdit?: boolean;
};

function UserIconImg({ isEdit }: UserIconImgProps) {
  const { imgCT, setImgCT } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const user = await getUser();
      setImgCT(user.image);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const imgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const base64 = await toBase64(file);
        const user = await getUser();
        await updateUser({ ...user, image: base64 });
        await fetchUser();
      } catch (error) {
        console.error('Error updating user image:', error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isEdit) fetchUser();
  }, [isEdit]);

  return (
    <div id="user-icon-img-main">
      <div id="user-icon-img-container">
        {isLoading ? (
          <div id="loading-img"><SpinnerLoading /></div>
        ) : (
          <>
            <label id="label-user-icon-img" htmlFor="user-img-input">
              <img
                id="user-img"
                src={ imgCT }
                alt="User-img"
                className={ imgCT ? 'd-inline' : 'd-none' }
              />
              <div
                id="icon-container"
                className={ !imgCT ? 'd-inline' : 'd-none' }
              >
                <i id="user-i" className="bi bi-person-circle" />
              </div>
              <span id="add-img-text">Adicionar foto</span>
            </label>
            <input
              id="user-img-input"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={ imgChange }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UserIconImg;
