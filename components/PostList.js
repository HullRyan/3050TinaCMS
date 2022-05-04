import Link from "next/link";

/**
 * Given an array of posts, return a list of posts as a React component.
 * @param postsList - the array of posts to display
 * @returns The function returns a React component containing the list of posts.
 */
export default function PostList(props) {
  return (
    <div className="post-list">
      {props.postsList.map((post) => (
        <div key={post.node.id}>
          <Link href={`/student/${post.node._sys.filename}`}>
            <a className="list-post">
              <div className="list-title">{post.node?.title}</div>
              <div className="list-author">{post.node?.author}</div>
              <div className="list-date">
                {new Date(post.node?.date).toUTCString()}
              </div>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .post-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto;
          padding-top: 2rem;
          font-size: 1.125rem;
          transition: all 0.3s ease-in-out;
        }
        .list-post {
          border: 3px solid #ccc;
          padding: 20px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 26rem;
          align-items: center;
          border-radius: 10px;
        }
        .list-post:hover {
          border-color: var(--red);
        }
        .list-title {
          font-size: 1.8em;
          font-weight: bold;
        }
        .list-author {
          font-size: 1em;
        }
        .list-date {
          font-size: 1em;
        }
      `}</style>
    </div>
  );
}
