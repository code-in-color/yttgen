import { api } from '@server/api/api'

const History = () => {
  const titleHistory = api.youtube.getTitleHistory.useQuery()

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
