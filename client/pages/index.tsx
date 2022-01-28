import { GetStaticProps, NextPage } from "next";

const PageIndex: NextPage = () => {
  return (
    <>
    </>
  )
}

export default PageIndex;

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/daily',
      permanent: false,
    },
  }
}
