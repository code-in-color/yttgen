import type { Post, Profile } from '@prisma/client'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const PublicProfilePage: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const userProfile = superjson.parse<Profile & { posts: Post[] }>(data)

  const { handle, posts } = userProfile

  const onEditProfile = async () => {
    await router.push(`${handle}/edit-profile`)
  }

  return (
    <>
      <button onClick={() => console.log('Subscriptions not implemented')}>
        Subscribe
      </button>
      <h1>{handle}</h1>
      <p>figuring shit out</p>

      <ol>
        {posts.map((post) => (
          <li className="border border-blue-400 px-4 py-2" key={post.id}>
            <a href={post.contentUrl} target="_blank" rel="noreferrer">
              {post.title}
            </a>
          </li>
        ))}
      </ol>
      <button
        className="border border-yellow-400 px-4 py-2"
        onClick={() => void onEditProfile()}
      >
        Edit Profile
      </button>
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
      posts: true
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

export default PublicProfilePage
