import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { useUserData } from "@hooks/index";
import { signOut } from "@actions/user";
import { withAdmin } from "@hoc/index";
import { Layout } from "@components/common";
import { UserContext } from "@context/user";

const Dashboard = () => {
  const userData = useUserData();
  const router = useRouter();
  const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    console.log("user data from admin => ", userData);
  }, [userData]);

  const handleSignOut = () => {
    signOut((success: any, error: any) => {
      if (success) {
        setUserToken(null);
        router.replace("/");
      }
    });
  };

  return (
    <Layout>
      <p>Dashboard</p>
      <Button onClick={handleSignOut} variant="contained" color="primary">
        Logout
      </Button>
    </Layout>
  );
};

export default withAdmin(Dashboard);
