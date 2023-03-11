export const getBaseUrl = () => {
  // Use url in browser
  if (typeof window !== 'undefined') return window.location

  // Use vercel url in SSR mode on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Use localhost in SSR mode locally
  return `http://localhost:${process.env.PORT ?? 3000}`
}
