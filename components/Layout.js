import Link from 'next/link'
import Head from 'next/head'

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: '3rem',
      }}
    >
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Example Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        {' | '}
        <Link href="/student">
          <a>Student</a>
        </Link>
        {' | '}
        <Link href="/teacher">
          <a>Teacher</a>
        </Link>
        {' | '}
        <Link href="/parent">
          <a>Parent</a>
        </Link>
      </header>
      <main>{props.children}</main>
    </div>
  )
}
