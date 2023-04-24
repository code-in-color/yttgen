import { api } from '@server/api/api'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext, NextPage } from 'next'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const ProfilePage: NextPage<Props> = ({ data }) => {
  const addProfileMut = api.youtube.addProfile.useMutation()
  // const userProfile = superjson.parse<Profile>(data)
  // const { socialProfiles } = userProfile

  // console.log('Social profiles', socialProfiles)

  // const profiles = superjson.parse<ReadonlyArray<SocialProfile>>(
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   socialProfiles!.toString()
  // )

  const onAddSocialProfileClicked = async () => {
    try {
      await addProfileMut.mutateAsync({
        platform: 'YouTube',
        url: 'https://youtube.com/c/iamwillshepherd'
      })
    } catch (err) {
      console.error('Adding profile failed', err)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <ul className="text-white">
        {profiles.map((p) => (
          <li key={p.url}>{p.platform}</li>
        ))}
      </ul> */}
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
      <button onClick={() => void onAddSocialProfileClicked()}>
        Add Social Profile
      </button>
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
