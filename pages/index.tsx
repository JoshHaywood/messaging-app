import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>Website name | Home</title>
      </Head>

      <Header />

      <main>
        Index
      </main>

      <Footer />
    </>
  );
};