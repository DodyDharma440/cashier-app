import React from "react";
import { useRouter } from "next/router";
import { AppLoading } from "@components/common";
import { useUserData } from "@hooks/index";
import { UserStatus } from "@enums/user";

type Props = any;

const withCashier = (WrappedComponent: React.FC<Props>) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const { userData } = useUserData();

      if (!userData?.token) {
        router.replace("/");
        return <AppLoading />;
      }

      if (
        userData?.result.status &&
        userData?.result.status !== UserStatus.kasir
      ) {
        router.back();
        return <AppLoading />;
      }

      return <WrappedComponent {...props} />;
    }

    return <AppLoading />;
  };
};

export default withCashier;
