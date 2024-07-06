// /src/context/UserProvider.tsx
import { useState } from 'react';
import UserContext from './UserContext';

type UserProviderProps = {
  children: React.ReactNode;
};
function UserProvider({ children }: UserProviderProps) {
  const [imgCT, setImgCT] = useState<string>('');
  const [userNameCT, setUserNameCT] = useState<string>('');

  return (
    <UserContext.Provider value={ { userNameCT, imgCT, setImgCT, setUserNameCT } }>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
