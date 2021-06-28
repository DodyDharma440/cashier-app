import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Grid, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Login } from "@components/auth";
import { AppLoading } from "@components/common";
import { UserStatus } from "@enums/user";
import { useUserData } from "@hooks/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: "100vh",
    },
    gridForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    gridIllustration: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const userData = useUserData();

  useEffect(() => {
    if (userData && userData?.token) {
      const { status } = userData.result;

      if (status === UserStatus.admin) {
        router.replace("/admin/dashboard");
      } else if (status === UserStatus.kasir) {
        router.replace("/kasir/dashboard");
      }
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Cashier App | Home</title>
      </Head>
      {userData?.token ? (
        <AppLoading />
      ) : (
        <Grid container className={classes.container}>
          <Grid item xs={12} md={6} lg={5} className={classes.gridForm}>
            <Box>
              <Login />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={7} className={classes.gridIllustration}>
            <Image
              width={500}
              height={250}
              src="https://www.nicepng.com/png/full/334-3349237_premium-man-paying-at-cashier-in-shopping-mall.png"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
