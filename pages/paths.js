/*import { useRouter } from "next/router";
export default function Post({ post }) {
  console.log(post);
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <h1>Posts are here</h1>;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "*" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://api.icndb.com/jokes/random/${context.params.id}`
  );
  const post = await res.json();
  console.log(post);
  return { props: { post } };
}
*/
