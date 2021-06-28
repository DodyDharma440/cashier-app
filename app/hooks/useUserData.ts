import { useContext, useState, useEffect } from "react";
import { UserContext } from "@context/user";
import { IUserAuthData } from "@custom-types/user";
import jwt from "jsonwebtoken";

const useUserData = () => {
  const { userToken } = useContext(UserContext);
  const [userData, setUserData] = useState<IUserAuthData | null>(null);

  useEffect(() => {
    if (userToken) {
      const decodedToken = jwt.decode(userToken);
      setUserData({
        result: decodedToken,
        token: userToken,
      });
    }
  }, [userToken]);

  return userData;
};

export default useUserData;
