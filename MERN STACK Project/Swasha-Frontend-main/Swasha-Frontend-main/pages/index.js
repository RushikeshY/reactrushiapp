import Head from "next/head";
import Layout from "../components/Layout";
import HomeContent from "../components/HomeContent";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <HomeContent />
      </Layout>
    </>
  );
}
