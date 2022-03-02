import { staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";

const query = `{
  getTeacherList{
    edges {
      node {
        id
        data { 
          title
        }
        sys {
          filename
        }
      }
    }
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  const postsList = data.getTeacherList.edges;
  return (
    <Layout>
      <h1>Teacher Posts</h1>
      <div>
        {postsList.map((post) => (
          <div key={post.node.id}>
            <Link href={`/teacher/${post.node.sys.filename}`}>
              <a>{post.node.data.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let data = {};
  const variables = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
