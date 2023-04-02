import Nav from '@components/Nav'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>yttgen</title>
        <meta name="Generate titles from descriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="flex flex-col items-center">
        <h1 className="text-6xl uppercase text-indigo-50">yttgen</h1>
        <p className="mt-2 text-white">YouTube title generator</p>
        <button
          className="border border-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:border-yellow-300"
          onClick={() => void router.push('/login')}
        >
          Go to app
        </button>
      </div>
    </>
  )
}

export default Home
