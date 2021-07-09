import React from "react";
import { Skeleton } from "@material-ui/lab";

const SkeletonCard = () => {
  return (
    <div
      style={{
        height: 270,
        background: "white",
        borderRadius: 8,
        boxShadow: "2px 1px 9px 0px #0000002e",
      }}
    >
      <Skeleton
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingTop: "75%",
        }}
        variant="rect"
        animation="wave"
      />
      <div style={{ padding: "8px 16px" }}>
        <Skeleton animation="wave" height={22} />
        <Skeleton animation="wave" height={20} width={100} />
      </div>
      <div style={{ padding: 16 }}>
        <Skeleton animation="wave" height={48} style={{ borderRadius: 8 }} />
      </div>
    </div>
  );
};

export default SkeletonCard;
