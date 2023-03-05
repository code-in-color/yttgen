import { z } from 'zod'
import { InProduction } from '@common/constants'

import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { OpenAI } from '@common/config'
import axios from 'axios'

const generatePrompt = (description: string) =>
  `Create catchy and click-baity YouTube title that's 🔥 using the following video description\n --- \n${description}\n ---`

export const youtubeRouter = createTRPCRouter({
  generateTitle: protectedProcedure
    .input(z.string().min(140, 'Give me something, bruv'))
    .mutation(async ({ input: description }): Promise<string | undefined> => {
      try {
        !InProduction && console.log('Description\n', description)
        const completion = await OpenAI.createCompletion({
          model: 'text-davinci-003',
          prompt: generatePrompt(description),
          max_tokens: 16
        })

        !InProduction && console.log('Completions', completion.data)

        return completion?.data?.choices[0]?.text || ''
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error('Completion::OpenAI Error\n', e.response)
          return
        }

        const error = e as Error
        console.error('/completion Error ', error)
      }
    })
})
