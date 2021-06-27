import React from "react";
import Image from "next/image";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { IMenuItem } from "@custom-types/layout";

type Props = {
  menuItems: IMenuItem[];
  renderMenuItem: (item: IMenuItem) => JSX.Element;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#fff",
      width: 250,
      position: "fixed",
      left: 0,
      bottom: 0,
      top: 0,
      zIndex: 100,
      padding: theme.spacing(1),
    },
    sidebarContent: {
      flex: 1,
    },
    logoWrapper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const Sidebar: React.FC<Props> = ({ menuItems, renderMenuItem }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.logoWrapper}>
        <Image
          src="/assets/images/logo.png"
          alt="Logo Cashier"
          width={130}
          height={90}
        />
      </Box>
      <Box className={classes.sidebarContent}>
        {menuItems.map(renderMenuItem)}
      </Box>
    </Box>
  );
};

export default Sidebar;
