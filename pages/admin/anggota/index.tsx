import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { useUserData } from "@hooks/index";
import { signOut } from "@actions/user";
import { withAdmin } from "@hoc/index";
import { Layout } from "@components/common";

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
    <Layout>
      <p>anggota</p>
      <Button onClick={handleSignOut} variant="contained" color="primary">
        Logout
      </Button>
    </Layout>
  );
};

export default withAdmin(Dashboard);
