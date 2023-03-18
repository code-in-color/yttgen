import { api } from '@server/api/api'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const History = () => {
  const titleHistory = api.youtube.getTitleHistory.useQuery()
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      void router.replace('/login')
    }
  })

  if (titleHistory) {
    return (
      <ol>
        {titleHistory.data?.map((generatedTitle) => (
          <li key={generatedTitle.id}>{generatedTitle.title}</li>
        ))}
      </ol>
    )
  }

  return <div>History</div>
}

export default History
