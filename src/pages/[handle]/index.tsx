import type { Post, Profile } from '@prisma/client'
import { prisma } from '@server/db'
import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import superjson from 'superjson'

interface Props {
  readonly data: string
}

const ProfilePage: React.FC<Props> = ({ data }) => {
  console.log('userProfile', data)
  const userProfile = superjson.parse<Profile & { posts: Post[] }>(data)

  const { handle, posts } = userProfile

  return (
    <>
      <p>{handle}</p>
      <p>figuring shit out</p>
      <ul>
        <li></li>
        <Link href="https://youtube.com/c/iamwillshepherd">YouTube</Link>
        <li>
          <Link href="https://twitch.tv/codeincolor">Twitch</Link>
        </li>
        <li>
          <Link href="https://linkin/in/williamrshepherd">LinkedIn</Link>
        </li>
        <li>
          <Link href="http://instagram/iamwillshepherd">Instagram</Link>
        </li>
      </ul>
      <ol>
        {posts.map((post) => (
          <li className="border border-blue-400 px-4 py-2" key={post.id}>
            <a href={post.contentUrl} target="_blank" rel="noreferrer">
              {post.title}
            </a>
          </li>
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

export default ProfilePage
