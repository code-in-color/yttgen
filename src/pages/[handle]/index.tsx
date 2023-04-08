import type { GeneratedTitle, Profile } from '@prisma/client'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext } from 'next'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const ProfilePage: React.FC<Props> = ({ data }) => {
  const userProfile = superjson.parse<
    Profile & { generatedTitles: GeneratedTitle[] }
  >(data)
  const { firstName, lastName } = userProfile
  const titles = userProfile.generatedTitles
  return (
    <>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <ol>
        {titles.map((title) => (
          <li key={title.id}>{title.title}</li>
        ))}
      </ol>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { handle } = ctx.query
  if (!handle || typeof handle !== 'string') {
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    }
  }

  const profile = await prisma.profile.findUnique({
    where: {
      handle: handle
    },
    include: {
      generatedTitles: true
    }
  })

  return {
    props: {
      data: superjson.stringify(profile)
    }
  }
}

export default ProfilePage
