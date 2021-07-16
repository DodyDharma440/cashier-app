import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Drawer, AppBar, Toolbar, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { HiMenu } from "react-icons/hi";
import { Sidebar, SidebarMenuItem } from "@components/common";
import { UserStatus } from "@enums/user";
import { useScreenWidth, useUserData, useDisclosure } from "@hooks/index";
import { menuDataAdmin, menuDataKasir } from "@constants/sidebarItem";
import { IMenuItem } from "@custom-types/layout";

type Props = {
  children: React.ReactNode;
  withSidebarRight?: boolean;
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
    withSidebarRight: {
      marginRight: 460,
      [theme.breakpoints.down("md")]: {
        marginRight: 0,
      },
    },
  })
);

const Layout: React.FC<Props> = ({ children, withSidebarRight }) => {
  const classes = useStyles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useUserData();
  const status = userData?.result.status;
  const screenWidth = useScreenWidth();

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
      {screenWidth && screenWidth < 960 ? (
        <>
          <AppBar position="fixed" className={classes.appBar} elevation={2}>
            <Toolbar>
              <IconButton onClick={onOpen}>
                <HiMenu />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <LayoutSidebar />
          </Drawer>
        </>
      ) : (
        <LayoutSidebar />
      )}
      <Box
        className={clsx(classes.content, {
          [classes.withSidebarRight]: withSidebarRight,
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
