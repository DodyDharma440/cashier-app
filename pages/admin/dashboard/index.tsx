import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { useUserData } from "@hooks/index";
import { signOut } from "@actions/user";

const Dashboard = () => {
  const { userData, setUserData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    console.log("user data from admin => ", userData);
  }, []);

  const handleSignOut = () => {
    signOut(() => {
      setUserData(null);
      router.replace("/");
    });
  };

  return (
    <div>
      <p>Dashboard</p>
      <Button onClick={handleSignOut} variant="contained" color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
