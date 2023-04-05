import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'src/env.mjs'

const client = google.youtube({
  version: 'v3',
  auth: env.YOUTUBE_API_KEY
})

const secret = '65b3dd0cd3cb433c2cb609bf8e55c9cd7be19047'

export default async function yt(req: NextApiRequest, res: NextApiResponse) {
  try {
    const a = await client.playlists.list({
      part: ['contentDetails', 'snippet'],
      channelId: 'UCN3Za9pYlMnabHvIvaLFHvw'
    })
    res.status(200).json({ yt: a })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
