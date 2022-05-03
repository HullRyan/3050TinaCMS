import Link from "next/link";

export default function PostList(props) {
    return (
      <div>
        {props.postsList.map((post) => (
          <div key={post.node.id} className="list-post">
            <Link href={`/student/${post.node.sys.filename}`}>
              <a>
                <div className="list-title">{post.node.data?.title}</div>
                <div className="list-author">{post.node.data?.author}</div>
                <div className="list-date">
                  {new Date(post.node.data?.date).toUTCString()}
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    );
  }