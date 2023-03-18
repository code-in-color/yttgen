import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Logout = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        await supabaseClient.auth.signOut()
        void router.replace('/')
        console.log('Logged out')
      } catch (error) {
        console.error('Failed to logout', error)
      }
    }

    void logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
}

export default Logout
