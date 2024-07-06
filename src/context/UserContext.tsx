import { createContext } from 'react';

type UserContextType = {
  userNameCT: string;
  imgCT: string;
  setImgCT: React.Dispatch<React.SetStateAction<string>>;
  setUserNameCT: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
