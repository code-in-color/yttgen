import { Configuration, OpenAIApi } from 'openai'
import { env } from 'src/env.mjs'

const config = new Configuration({
  apiKey: env.OPEN_AI_API_KEY
})

export const OpenAI = new OpenAIApi(config)
