import { api } from '@server/api/api'
import { useRouter } from 'next/router'

const Titles = () => {
  const titles = api.youtube.getTitles.useQuery()
  const router = useRouter()

  const onTitleClicked = async (titleId: string) =>
    await router.push(`titles/${titleId}`)

  if (titles) {
    return (
      <ol className="flex flex-col gap-4 text-slate-50">
        {titles.data?.map((generatedTitle) => (
          <li
            className="h-12 cursor-pointer border border-yellow-400 px-4 py-2 hover:border-blue-500"
            key={generatedTitle.id}
            onClick={(e) => {
              e.preventDefault()
              void onTitleClicked(generatedTitle.id)
            }}
          >
            {generatedTitle.title}
          </li>
        ))}
      </ol>
    )
  }

  return <div>History</div>
}

export default Titles
