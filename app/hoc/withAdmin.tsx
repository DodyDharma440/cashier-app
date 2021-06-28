import React from "react";
import router, { useRouter } from "next/router";
import { AppLoading } from "@components/common";
import { useUserData } from "@hooks/index";
import { UserStatus } from "@enums/user";

type Props = any;

const withAdmin = (WrappedComponent: React.FC<Props>) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const userData = useUserData();

      if (userData) {
        if (!userData?.token) {
          router.replace("/");
          console.log("token not found");
          return <AppLoading />;
        }

        if (
          userData?.result.status &&
          userData?.result.status !== UserStatus.admin
        ) {
          router.back();
          console.log("isnotadmin");
          return <AppLoading />;
        }

        return <WrappedComponent {...props} />;
      }

      router.replace("/");
    }

    return <AppLoading />;
  };
};

export default withAdmin;
