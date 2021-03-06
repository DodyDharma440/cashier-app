import React, { useState, useContext } from "react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { UserContext } from "@context/user";
import { HiOutlineEye } from "react-icons/hi";
import { IUserLoginForm, IUserAuthData } from "@custom-types/user";
import { signIn } from "@actions/user";
import { useUserData } from "@hooks/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
      borderRadius: 16,
    },
    titleWrapper: {
      textAlign: "center",
      marginBottom: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(2),
      fontWeight: 500,
    },
    subtitle: {
      color: "#555",
    },
    input: {
      margin: `${theme.spacing(2)}px 0px`,
    },
    image: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const { userToken, setUserToken } = useContext(UserContext);

  const [inputValue, setInputValue] = useState<IUserLoginForm>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const callbackSignIn = (res: AxiosResponse, error: any) => {
    setLoading(false);

    if (res) {
      setUserToken(res.data.token);

      if (res.data.result.status === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/kasir/dashboard");
      }
    }

    if (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn(inputValue, callbackSignIn);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.titleWrapper}>
        <Box className={classes.image}>
          <Image
            src="/assets/images/logo.png"
            alt="Logo Cashier"
            width={140}
            height={100}
          />
        </Box>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>
        <Typography className={classes.subtitle}>
          Silahkan login untuk melanjutkan.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          value={inputValue.username}
          onChange={handleChange}
          autoComplete="off"
          className={classes.input}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={inputValue.password}
          onChange={handleChange}
          autoComplete="off"
          className={classes.input}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} color="secondary">
                  <HiOutlineEye />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box style={{ textAlign: "center" }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={
              loading && <CircularProgress color="secondary" size={15} />
            }
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
