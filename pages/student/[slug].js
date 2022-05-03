import { staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import Post from "../../components/Post";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";

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
