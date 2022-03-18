import Link from "next/link";
import Head from "next/head";

export const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Example Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sidebar">
        <div>
          <Link href="/">
            <img
              src="WilsonCrest.png"
              alt="Wilson "
              className="homeBtnImage"
            />
          </Link>
        </div>
        <Link href="/student">
          <a>Student</a>
        </Link>
        <Link href="/parent">
          <a>Parent</a>
        </Link>
        <Link href="/teacher">
          <a>Teacher</a>
        </Link>
        <Link href="/media">
          <a>Media</a>
        </Link>
      </div>
      <main className="content">{props.children}</main>
      <style jsx>{``}</style>
    </div>
  );
};
