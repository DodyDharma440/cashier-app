import React from "react";
import { withAdmin } from "@hoc/index";
import { Layout } from "@components/common";

const Anggota = () => {
  return (
    <Layout>
      <p>anggota</p>
    </Layout>
  );
};

export default withAdmin(Anggota);
