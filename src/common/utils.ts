export const getBaseUrl = () => {
  // Use preview deployment URL on preview branches
  if (process.env.VERCEL_ENV === 'preview' && typeof window !== 'undefined')
    return 'https://${process.env.VERCEL_URL}'

  // Use relative url in browser
  if (typeof window !== 'undefined') return ''

  // Use vercel url in SSR mode on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Use localhost in SSR mode locally
  return `http://localhost:${process.env.PORT ?? 3000}`
}
