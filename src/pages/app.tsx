import Yttgen from '@components/Yttgen'
import { useUser } from '@supabase/auth-helpers-react'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const App: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      void router.replace('/login')
    }
  })

  return (
    <>
      <Head>
        <title>yttgen - App</title>
        <meta name="Generate titles from descriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="mb-16 flex flex-col items-center">
          <div className="container flex flex-col items-center justify-center px-4 py-16 font-medium">
            <Yttgen />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
