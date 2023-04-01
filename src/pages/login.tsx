import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React from 'react'
import { useRouter } from 'next/router'
import { getBaseUrl } from '@common/utils'

const Login = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  React.useEffect(() => {
    if (user) {
      void router.replace('/app')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function login() {
    try {
      await supabaseClient.auth.signInWithOAuth({
        provider: 'discord',

        options: {
          redirectTo: getBaseUrl() + '/app'
        }
      })
    } catch (e) {
      console.error('Failed to login.', e)
    }
  }

  return (
    <button
      className="border border-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:border-yellow-300"
      onClick={(e) => {
        e.preventDefault()
        void login()
      }}
    >
      Login
    </button>
  )
}

export default Login
