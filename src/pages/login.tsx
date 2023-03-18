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

  return (
    <button
      className="bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-yellow-500/20"
      onClick={() =>
        void supabaseClient.auth.signInWithOAuth({
          provider: 'discord',
          options: {
            redirectTo: getBaseUrl() + '/app'
          }
        })
      }
    >
      Login
    </button>
  )
}

export default Login
