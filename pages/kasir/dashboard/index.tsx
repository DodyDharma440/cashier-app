import React, { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { withCashier } from "@hoc/index";
import { Layout } from "@components/common";
import { signOut } from "@actions/user";
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
    <>
      <Head>
        <title>Cashier | Dashboard</title>
      </Head>

      <Layout>
        <p>Dashboard</p>
        <Button onClick={handleSignOut} variant="contained" color="primary">
          Logout
        </Button>
      </Layout>
    </>
  );
};

export default withCashier(Dashboard);
