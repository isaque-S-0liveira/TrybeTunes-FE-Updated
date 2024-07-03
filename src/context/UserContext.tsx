import { createContext } from 'react';

type UserContextType = {
  imgCT: string;
  setImgCT: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
