import { GetStaticProps } from "next";

export default <></>;

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/daily',
      permanent: false,
    },
  }
}
