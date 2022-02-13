import Head from "next/head";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const paths = data.map((ninja) => {
    return {
      params: { id: ninja.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};
export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  return {
    props: { ninja: data },
  };
}
const Details = ({ ninja }) => {
  return (
    <>
      <Head>
        <title>Test | {ninja.name}</title>
      </Head>
      <div>
        <h1 className="text-xl font-bold">Ninja Details</h1>
        <h1>{ninja.name}</h1>
        <h1>{ninja.email}</h1>
        <h1>{ninja.address.city}</h1>
      </div>
    </>
  );
};

export default Details;
