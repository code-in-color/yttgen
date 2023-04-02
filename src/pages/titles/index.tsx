import { type GeneratedTitle } from '@prisma/client'
import { prisma } from '@server/db'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session, User } from '@supabase/supabase-js'
import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import superjson from 'superjson'

interface Props {
  readonly initialSession: Session
  readonly user: User
  readonly data: string
}

const Titles: React.FC<Props> = ({ data }) => {
  // const titles = api.youtube.getTitles.useQuery()
  const router = useRouter()
  const titles = superjson.parse<GeneratedTitle[]>(data)

  async function onTitleClicked(titleId: string) {
    return await router.push(`titles/${titleId}`)
  }

  return (
    <ol className="flex flex-col gap-4 text-slate-50">
      {titles?.map((generatedTitle) => (
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session }
  } = await supabase.auth.getSession()

  console.log('session', session)
  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }

  const titles = await prisma.generatedTitle.findMany({
    where: {
      user: session.user.id
    }
  })

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: superjson.stringify(titles)
    }
  }
}

export default Titles
