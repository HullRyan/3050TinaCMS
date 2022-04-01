import { staticRequest } from "tinacms";
import { Layout } from "../components/Layout";

export default function Home(props) {
  return (
    <div>
      <div className="full-width home-links">
        <div>Students</div>
        <div>Parents</div>
        <div>Teachers</div>
      </div>
      <style jsx>
        {`
          .full-width {
            width: 100%;
            background-color: #fafafa;
          }
        `}
      </style>
    </div>
  );
}
