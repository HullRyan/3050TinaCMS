import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import styles from "../styles/default.css";
import { RouteMappingPlugin } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });
import { Layout } from "../Components/Layout.js";

const branch = "main";
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaCMS
          mediaStore={TinaCloudCloudinaryMediaStore}
            cmsCallback={(cms) => {
              /**
               * Enables `tina-admin` specific features in the Tina Sidebar
               */
              cms.flags.set("tina-admin", false);
              /**
               * When `tina-admin` is enabled, this plugin configures contextual editing for collections
               */
              const RouteMapping = new RouteMappingPlugin(
                (collection, document) => {
                  if (["authors", "global"].includes(collection.name)) {
                    return undefined;
                  }
                  return `/${collection.name}/${document.sys.filename}`;
                }
              );
              cms.plugins.add(RouteMapping);
              return cms;
            }}
            documentCreatorCallback={{
              /**
               * After a new document is created, redirect to its location
               */
              onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
                return (window.location.href = relativeUrl);
              },
            }}
            apiURL={apiURL}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TinaCMS>
        }
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TinaEditProvider>
    </>
  );
};

export default App;
