import Link from "next/link";
import Head from "next/head";
import Logo from "../components/Logo";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export const Layout = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function getActiveTab(tab) {
    return currentTab === tab ? "active" : "";
  }

  return (
    <div className="page">
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Example Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar">
        <div className="navbar-left">
          <div className="home-button">
            <Link href="/">
              <Logo className="home-button-logo" />
            </Link>
          </div>
          <div className="navbar-title">
            Wilson Stem Academy <br /> Computer Science Resources
          </div>
        </div>
        <div className="navbar-links">
          <Link href="/">
            <a>Home</a>
          </Link>
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
        <div className="sidebar-button" onClick={() => setDrawerOpen(true)}>
          <HiMenu size={34} />
        </div>
      </div>
      <div
        className={drawerOpen ? "drawer" : "drawer drawer-offscreen"}
        onClick={closeDrawer}
      />
      <div
        className={
          drawerOpen
            ? "drawer-content"
            : "drawer-content drawer-content-offscreen"
        }
      >
        <div className="drawer-header">
          <div className="drawer-title">
            Wilson Stem Academy <br /> Computer Science Resources
          </div>
        </div>
        <div className="drawer-links">
          <Link href="/">
            <a onClick={closeDrawer}>Home</a>
          </Link>
          <Link href="/student">
            <a onClick={closeDrawer}>Student</a>
          </Link>
          <Link href="/parent">
            <a onClick={closeDrawer}>Parent</a>
          </Link>
          <Link href="/teacher">
            <a onClick={closeDrawer}>Teacher</a>
          </Link>
          <Link href="/media">
            <a onClick={closeDrawer}>Media</a>
          </Link>
        </div>
      </div>
      <div className="content">{props.children}</div>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          grid-gap: 1rem;
          gap: 1.5rem;
          align-items: center;
          padding: 0 1rem 0 1rem;
          outline: 4px solid;
          outline-color: currentcolor;
          outline-color: var(--yellow);
          font-weight: 600;
          font-size: 1.4rem;
          height: 6rem;
        }
        a {
          text-decoration: none;
        }
        .navbar-title {
          display: none;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0 1rem 0;
        }
        .navbar-links {
          display: none;
          gap: 1rem;
          height: 100%;
        }
        .navbar-links > * {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .home-button {
          display: flex;
          width: 80px;
          height: 80px;
        }
        .sidebar-button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-button:hover {
          color: var(--yellow);
          cursor: pointer;
        }
        a:hover {
          color: var(--yellow);
        }
        .drawer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 1000%;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1500;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.2s ease-out;
        }
        .drawer-offscreen {
          position: absolute;
          left: -100%;
          background-color: rgba(0, 0, 0, 0);
          width: 100%;
          height: 100%;
        }
        .drawer-title {
          text-transform: uppercase;
          align-text: center;
          text-align: center;
          font-size: calc(0.875 * 16px);
          line-height: 1.5em;
        }
        .drawer-header {
          width: 100%;
          padding-top: 1rem;
          font-weight: normal;
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .drawer-content {
          position: absolute;
          display: flex;
          flex-direction: column;
          height: 100%;
          top: 0;
          left: 0;
          width: 13rem;
          z-index: 1501;
          background-color: var(--gray);
          transition: all 0.25s ease-out;
          opacity: 1;
        }
        .drawer-content-offscreen {
          left: -100%;
          opacity: 0;
        }
        .logo {
          color: red;
        }
        .heading {
          height: 2rem;
          diplsay: flex;
          flex-direction: row;
        }
        .drawer-button {
          padding: 0.2rem;
          cursor: pointer;
          width: 1.7rem;
          height: 1.7rem;
          justify-content: space-around;
        }
        .drawer-links {
          display: flex;
          flex-direction: column;
          padding-left: 1rem;
          padding-top: 2rem;
          gap: 0.2rem;
        }
        @media screen and (min-width: 950px) {
          .navbar-title {
            display: flex;
          }
          .navbar-links {
            display: flex;
          }
          .sidebar-button {
            display: none;
          }
        }
        @media screen and (min-width: 700px) {
          .navbar-links {
            display: flex;
          }
          .sidebar-button {
            display: none;
          }
          .drawer {
            display: none;
          }
          .drawer-content {
            display: none;
          }
        }
        .content {
          padding-top: 6rem;
          padding-bottom: 6rem;
          max-width: 80rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          transition: all .2s;
        }
        @media screen and (min-width: 600px) {
          .content {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </div>
  );
};
