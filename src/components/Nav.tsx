import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

interface PageRoute {
  readonly id: string
  readonly name: string
  readonly path: string
}

const routes: PageRoute[] = [
  {
    id: 'pms',
    name: 'Home',
    path: '/'
  },
  {
    id: 'app',
    name: 'App',
    path: '/app'
  },
  {
    id: 'title_list',
    name: 'Titles',
    path: '/titles'
  },
  {
    id: 'login',
    name: 'Login',
    path: '/login'
  },
  {
    id: 'logout',
    name: 'Logout',
    path: '/logout'
  }
]

const Nav = () => {
  const user = useUser()
  const links = user
    ? routes.filter((route) => route.id !== 'logout')
    : routes.filter((route) => route.id !== 'login')

  return (
    <nav>
      <ul className="flex gap-8">
        {[...links].map((page) => (
          <li key={page.id}>
            <Link href={page.path}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
