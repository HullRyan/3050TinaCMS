import { staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const query = `query getPost($relativePath: String!) {
  getTeacherDocument(relativePath: $relativePath) {
    data {
      title
      author {
      ... on Document {
        id
        }
      }
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
      <div className="post-container">
      <div className="post">
        {data?.getTeacherDocument?.data?.title && (
          <div className="title">{data?.getTeacherDocument?.data?.title}</div>
        )}
        {data?.getTeacherDocument?.data?.author && (
          <div className="author">
            Posted by: {data?.getTeacherDocument?.data?.author}
          </div>
        )}
        {data?.getTeacherDocument?.data?.date && (
          <div className="date">{data?.getTeacherDocument?.data?.date}</div>
        )}
        <TinaMarkdown content={data?.getTeacherDocument?.data?.body} />
      </div>
    </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        getTeacherList{
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
  const paths = postsResponse.getTeacherList.edges.map((x) => {
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
