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
  userToken: string | null;
  setUserToken: Dispatch<SetStateAction<string | null>>;
};

const initialContext: Context = {
  userToken: null,
  setUserToken: () => {},
};

export const UserContext = createContext(initialContext);

export const UserProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieData = getCookie("auth-token");

    if (cookieData[0] !== "") {
      setUserToken(cookieData);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
