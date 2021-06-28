import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Drawer, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { HiMenu } from "react-icons/hi";
import { Sidebar, SidebarMenuItem } from "@components/common";
import { UserStatus } from "@enums/user";
import { useScreenWidth, useUserData } from "@hooks/index";
import { menuDataAdmin, menuDataKasir } from "@constants/sidebarItem";
import { IMenuItem } from "@custom-types/layout";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginLeft: 250,
      padding: 16,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginTop: 48,
      },
    },
    appBar: {
      backgroundColor: "#fff",
    },
  })
);

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const userData = useUserData();
  const status = userData?.result.status;
  const screenWidth = useScreenWidth();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const LayoutSidebar = () => (
    <Sidebar
      menuItems={status === UserStatus.admin ? menuDataAdmin : menuDataKasir}
      renderMenuItem={(item: IMenuItem) => (
        <SidebarMenuItem key={item.path} item={item} />
      )}
    />
  );

  return (
    <Box id="layout">
      {screenWidth < 960 ? (
        <>
          <AppBar position="fixed" className={classes.appBar} elevation={2}>
            <Toolbar>
              <IconButton onClick={handleOpenDrawer}>
                <HiMenu />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
            <LayoutSidebar />
          </Drawer>
        </>
      ) : (
        <LayoutSidebar />
      )}
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};

export default Layout;
