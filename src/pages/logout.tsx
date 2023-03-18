import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'

const Logout = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    const logout = async () => {
      try {
        await supabaseClient.auth.signOut()
      } catch (error) {
        console.error(error)
      }
    }

    void logout()
  })

  return (
    <div className="text-white">
      {user ? <p>Logging out</p> : <p>Logged out</p>}
    </div>
  )
}

export default Logout
