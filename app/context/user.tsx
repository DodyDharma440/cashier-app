import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { IUserAuthData } from "@custom-types/user";
import { getCookie } from "@utils/cookie";

type Props = {
  children: React.ReactNode;
};

type Context = {
  userData: IUserAuthData | null;
  setUserData: Dispatch<SetStateAction<IUserAuthData | null>>;
};

const initialContext: Context = {
  userData: null,
  setUserData: () => {},
};

export const UserContext = createContext(initialContext);

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<IUserAuthData | null>(null);

  useEffect(() => {
    const cookieData = getCookie("user-data");

    if (cookieData[0] !== "") {
      setUserData(JSON.parse(getCookie("user-data")));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
