import { staticRequest } from "tinacms";
import { Post } from "../../components/Post.js";
import { useTina } from "tinacms/dist/edit-state";

/**
 * Given a relative path, return the post document.
 * @param relativePath - the relative path of the post document
 * @returns The function returns the post document.
 */
const query = `query getPostDocument($relativePath: String!) {
  getStudentDocument(relativePath: $relativePath) {
    data {
      title
      author
      date
      body
    }
  }
}
`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  /**
   * This function is a hook that uses the Tina client to fetch data from a GraphQL endpoint.
   * @param query - The GraphQL query to send to the endpoint
   * @param variables - The variables to send with the GraphQL query
   * @param data - The data returned from the GraphQL endpoint
   * @returns The function returns an object with the data, loading, and error properties.
   */
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Post props={data.getStudentDocument.data} />
    </>
  );
}

/**
 * This function returns an array of objects that contain the path and fallback for each post.
 * @returns An array of objects that contain the path and fallback for each post.
 */
export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        getStudentList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = postsResponse.getStudentList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

/**
 * Given a slug, return the static props for the page.
 * @param ctx - the context of the request
 * @returns The function returns a promise that resolves to the static props for the page.
 */
export const getStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
