import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { type NextPage } from 'next'
import Head from 'next/head'

import React from 'react'
import { getBaseUrl } from '~/common/utils'
import { api } from '~/server/api/api'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>yttgen</title>
        <meta name="Generate titles from descriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="mb-16 flex flex-col items-center">
          <h1 className="text-6xl uppercase text-indigo-50">yttgen</h1>
          <p className="mt-2 text-white">YouTube title generator</p>
          <div className="container flex flex-col items-center justify-center px-4 py-16 font-medium">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

const AuthShowcase: React.FC = () => {
  const supabaseClient = useSupabaseClient()
  const session = useSession()

  const {
    data,
    isFetching,
    refetch: refetchGenTitle
  } = api.youtube.generateTitle.useQuery(
    "Spending some time learning more about OpenAI's APIs, so I have an excuse to create content. I'm also learning about tRPC integration with Nextjs + Supabase for auth and db.",
    {
      enabled: false
    }
  )

  if (!session?.user) {
    return (
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() =>
          void supabaseClient.auth.signInWithOAuth({
            provider: 'discord',
            options: {
              redirectTo: getBaseUrl()
            }
          })
        }
      >
        Sign in
      </button>
    )
  }

  return isFetching ? (
    <p>Fetching...</p>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-slate-50">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      {session?.user.email !== 'williamrshepherd@gmail.com' ? undefined : (
        <div className="">
          <button
            className="border p-2 text-violet-50"
            onClick={() => void refetchGenTitle()}
          >
            Generate Title
          </button>
          <pre className="text-white">
            {data?.success && <p>{data.completion}</p>}
          </pre>
        </div>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void supabaseClient.auth.signOut()}
      >
        Sign out
      </button>
    </div>
  )
}
