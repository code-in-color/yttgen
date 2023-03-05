import { type AppType } from 'next/app'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { Session } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../common/database.types'
import { api } from '~/server/api/api'

import '~/styles/globals.css'

const MyApp: AppType<{ initialSession: Session | null }> = ({
  Component,
  pageProps
}) => {
  const supabaseClient = createBrowserSupabaseClient<Database>()

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default api.withTRPC(MyApp)
