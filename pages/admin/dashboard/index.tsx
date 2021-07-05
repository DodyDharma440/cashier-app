import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { signOut } from "@actions/user";
import { withAdmin } from "@hoc/index";
import { Layout } from "@components/common";
import { UserContext } from "@context/user";

const Dashboard = () => {
  const router = useRouter();
  const { setUserToken } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(() => {
      setUserToken(null);
      router.replace("/");
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
