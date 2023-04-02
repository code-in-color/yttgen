import { Configuration, OpenAIApi } from 'openai'

export const InProduction = process.env.NODE_ENV === 'production'

const config = new Configuration({
  apiKey: process.env['OPEN_AI_API_KEY']
})
export const OpenAI = new OpenAIApi(config)

export const OneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
