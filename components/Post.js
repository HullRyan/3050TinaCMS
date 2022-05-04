import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Post(data) {
  console.log(data);
  const props = data.props;
  return (
    <div className="post">
      {console.log(props.props)}
      {props.title && <div className="title">{props.title}</div>}
      <div className="details-container">
        {props.author && (
          <div className="author">Posted by: {props.author}</div>
        )}
        {props.date && <div className="date">{props.date}</div>}
      </div>
      <TinaMarkdown content={props.body} />
      <style jsx global>{`
        .post {
          max-width: 56rem;
          padding-top: 2rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 2rem;
          padding-right: 2rem;
          font-size: 1.125rem;
        }
        .post > img {
          max-width: 100%;
          height: auto;
        }
        .title {
          font-weight: 800;
          font-size: 4rem;
          text-align: center;
          width: 100%;
          margin-bottom: 2rem;
        }
        .post img {
          max-width: 100% !important;
          height: auto !important;
        }
        .author {
        }
        .date {
        }
        @media screen and (max-width: 620px) {
          .post {
            font-size: 0.9rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};
