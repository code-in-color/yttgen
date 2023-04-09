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
    ? routes.filter((route) => route.id !== 'login')
    : routes.filter((route) => route.id !== 'logout')

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <ul className="flex items-center justify-between">
          {[...links].map((page) => (
            <li
              key={page.id}
              className={page.id === 'logout' ? 'ml-auto' : 'mr-4 py-2 text-xl'}
            >
              <Link href={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
