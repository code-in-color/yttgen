import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { type NextPage } from 'next'
import Head from 'next/head'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBaseUrl } from '@common/utils'
import { api } from '@server/api/api'

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

let renderCount = 0

const AuthShowcase: React.FC = () => {
  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const [completion, setGeneratedTitle] = useState('')
  const a = api.youtube.generateTitle.useMutation({
    onSuccess: (title) => title && setGeneratedTitle(title)
  })
  const {
    register,
    formState: { errors },
    watch,
    getValues
  } = useForm({
    defaultValues: {
      description: ''
    }
  })

  const onGenerateTitleClicked = () => {
    const { description } = getValues()
    a.mutate(description)
    console.log(description)
  }

  React.useEffect(() => {
    renderCount++
  }, [watch])

  if (!session?.user) {
    return (
      <>
        <p>
          Redirect is to <pre>{getBaseUrl()}</pre>
        </p>
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
      </>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <pre className="text-white">
        {JSON.stringify({ renderCount, errors }, null, 2)}
      </pre>
      <p className="text-center text-2xl text-slate-50">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      {session?.user.email !== 'williamrshepherd@gmail.com' ? undefined : (
        <div className="">
          <form className="flex flex-col gap-4">
            <textarea {...register('description', { required: true })} />
            {errors.description && <p>A prompt must be specified.</p>}

            <button
              type="button"
              onClick={() => void onGenerateTitleClicked()}
              className="border p-2 text-violet-50"
            >
              Generate Title
            </button>
          </form>
          <pre className="text-white">{completion && <p>{completion}</p>}</pre>
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
