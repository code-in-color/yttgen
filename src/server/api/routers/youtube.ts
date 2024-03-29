import { z } from 'zod'
import { InProduction } from '@common/constants'

import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { OpenAI } from '@common/config'
import axios from 'axios'
import { prisma } from '@server/db'

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
    }),
  saveTitle: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        title: z.string()
      })
    )
    .mutation(async ({ input, ctx }): Promise<void> => {
      const { prompt, title } = input
      const { prisma, session } = ctx

      try {
        await prisma.generatedTitle.create({
          data: {
            prompt: prompt,
            title: title,
            user: session.user.id
          }
        })
      } catch (error) {
        console.error('`saveSomething` failed', error)
      }
    }),
  getTitles: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user
    console.log('UserID', userId)
    try {
      const history = await prisma.generatedTitle.findMany({
        where: { user: userId }
      })
      return history
    } catch (error) {
      console.error('`getTitleHistory` failed', error)
    }
  }),
  getTitle: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.session.user
      try {
        const title = await prisma.generatedTitle.findUnique({
          where: { id: input }
        })

        if (title?.user !== userId) {
          throw new Error('Title does not belong to you')
        }

        return title
      } catch (error) {
        console.error('`getTitle` failed', error)
      }
    })
})
