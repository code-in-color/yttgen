import { type SocialProfile } from '@common/types'
import type { Prisma, Profile } from '@prisma/client'
import { api } from '@server/api/api'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const EditProfilePage: NextPage<Props> = ({ data }) => {
  const router = useRouter()
  const profile = superjson.parse<Profile>(data)
  const { socialProfiles, handle } = profile

  const onAddProfile = async () => {
    await router.push(`/${handle}/add-profile`)
  }

  return (
    <div className="">
      <ul className="flex flex-col gap-4 text-white">
        {(socialProfiles as Prisma.JsonArray).map((p) => {
          const socialProfile = p as unknown as SocialProfile
          return (
            <li key={socialProfile.url}>
              <span>
                {socialProfile.platform} {socialProfile.url}
              </span>
            </li>
          )
        })}
      </ul>
      <button
        className="mt-8 border border-purple-400 px-4 py-2"
        onClick={() => void onAddProfile()}
      >
        Add Social Media Profile
      </button>
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

export default EditProfilePage
