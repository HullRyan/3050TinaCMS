import { staticRequest } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import PostList from "../../components/PostList";

const query = `{
  parentConnection {
    edges {
      node {
        id
        data { 
          title
        }
        _sys {
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
  const postsList = data.getParentList.edges;
  return (
    <>
      <h1>Parent Posts</h1>
      <PostList postsList={postsList}></PostList>
    </>
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
