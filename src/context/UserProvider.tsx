// /src/context/UserProvider.tsx
import { useState } from 'react';
import UserContext from './UserContext';

type UserProviderProps = {
  children: React.ReactNode;
};
function UserProvider({ children }: UserProviderProps) {
  const [imgCT, setImgCT] = useState<string>('');

  return (
    <UserContext.Provider value={ { imgCT, setImgCT } }>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
