import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import clsx from "clsx";
import { IMenuItem } from "@custom-types/layout";

type Props = {
  item: IMenuItem;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#fff",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      borderRadius: theme.spacing(1),
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      marginBottom: theme.spacing(1),
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        cursor: "pointer",
      },
    },
    icon: {
      display: "flex",
      alignItems: "center",
      fontSize: 20,
      marginRight: theme.spacing(2),
    },
    label: {
      fontWeight: 500,
    },
    activeLink: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const SidebarItem: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const { icon, label, path } = item;
  const { asPath } = useRouter();

  const [isActive, setIsActive] = useState(false);

  const arrayPath = asPath.split("/");

  useEffect(() => {
    if (arrayPath[2] === item.label.toLowerCase()) {
      setIsActive(true);
    }
  }, [item, arrayPath]);

  return (
    <Link href={path}>
      <Box
        className={clsx(classes.container, {
          [classes.activeLink]: isActive,
        })}
      >
        <Box className={classes.icon}>{icon}</Box>
        <Typography className={classes.label}>{label}</Typography>
      </Box>
    </Link>
  );
};

export default SidebarItem;
