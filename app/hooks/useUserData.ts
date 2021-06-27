import { useContext } from "react";
import { UserContext } from "@context/user";

const useUserData = () => {
  const { userData, setUserData } = useContext(UserContext);

  return { userData, setUserData };
};

export default useUserData;
