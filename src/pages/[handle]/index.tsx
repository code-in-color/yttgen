import type { GetServerSidePropsContext } from 'next'
import { prisma } from '@server/db'
import { Profile } from '@prisma/client'

interface Props {
  readonly userProfile: Profile
}

const Profile: React.FC<Props> = ({ userProfile }) => {
  return <pre>{JSON.stringify(userProfile, null, 2)}</pre>
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
    }
  })

  return {
    props: {
      userProfile: profile
    }
  }
}

export default Profile
