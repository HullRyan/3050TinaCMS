import { staticRequest } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import PostList from "../../components/postList";

/**
 * Get a list of all student notes.
 * @returns An array of objects containing the id, data, and filename of each note.
 */
const query = `{
  getStudentList{
    edges {
      node {
        id
        data { 
          title
          author
          date
        }
        sys {
          filename
        }
      }
    }
  }
}`;


/**
 * This is the home page component.
 * @param props - the props passed in from the parent component
 * @returns The function returns a react component.
 */
export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  const postsList = data.getStudentList.edges;
  return (
    <>
      <h1>Student Posts</h1>
      <PostList postsList={postsList}></PostList>
    </>
  );
}

/**
 * Given a GraphQL query and variables, return the data from the query.
 * @param query - the GraphQL query
 * @param variables - the variables for the GraphQL query
 * @returns The function returns the data from the query.
 */
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
