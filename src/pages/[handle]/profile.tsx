import { Profile } from '@prisma/client'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext, NextPage } from 'next'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const ProfilePage: NextPage<Props> = ({ data }) => {
  const userProfile = superjson.parse<Profile>(data)

  const onAddSocialProfileClicked = () => {}

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block" htmlFor="platform-input">
          Social Media Platform
        </label>
        <input type="text" name="platform-input" />
      </div>
      <div>
        <label className="block" htmlFor="url-input">
          Social Media URL
        </label>
        <input type="text" name="url-input" />
      </div>
      <button>Add Social Profile</button>
      Edit profile page
    </div>
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
    }
  })
  if (!profile) {
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    }
  }

  return {
    props: {
      data: superjson.stringify(profile)
    }
  }
}

export default ProfilePage
