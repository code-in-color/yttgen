import { type GeneratedTitle } from '@prisma/client'
import { prisma } from '@server/db'
import {
  createServerSupabaseClient,
  type Session,
  type User
} from '@supabase/auth-helpers-nextjs'
import { type GetServerSidePropsContext } from 'next'
import superjson from 'superjson'

interface Props {
  readonly initialSession: Session
  readonly user: User
  readonly data: string
}

const Title: React.FC<Props> = ({ data }) => {
  const title = superjson.parse<GeneratedTitle>(data)

  return (
    <main className="flex flex-col items-center">
      <p>{title.createdAt && title.createdAt.toISOString()}</p>
      <p>{title.prompt}</p>
      <p>{title.title}</p>
    </main>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const { id: titleId } = ctx.query
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }

  if (typeof titleId !== 'string' || !titleId) {
    return {
      props: {
        initialSession: session,
        user: session.user,
        error: 'No `titleId` provided.'
      }
    }
  }

  const title = await prisma.generatedTitle.findUnique({
    where: {
      id: titleId
    }
  })

  console.log('title', title)
  return {
    props: {
      initialSession: session,
      user: session.user,
      data: superjson.stringify(title)
    }
  }
}

export default Title
