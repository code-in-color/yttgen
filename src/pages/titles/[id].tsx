import { api } from '@server/api/api'
import { useRouter } from 'next/router'

export default function Title() {
  const router = useRouter()
  const { id: titleId } = router.query
  const { data } = api.youtube.getTitle.useQuery(titleId as string, {})

  if (typeof titleId !== 'string' || titleId === '') {
    return <p>You need a title to look at</p>
  }

  return (
    <main className="flex flex-col items-center">
      <p>{data?.createdAt && data?.createdAt.toISOString()}</p>
      <p>{data?.prompt}</p>
      <p>{data?.title}</p>
    </main>
  )
}
