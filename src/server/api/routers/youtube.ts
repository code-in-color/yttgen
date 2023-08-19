import { z } from 'zod'

import { OpenAI } from '@common/config'
import type { Platform, SocialProfile } from '@common/types'
import { type Prisma } from '@prisma/client'
import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { prisma } from '@server/db'
import axios from 'axios'

const generatePrompt = (description: string) =>
  `Create catchy and click-baity YouTube title that's 🔥 using the following video description\n --- \n${description}\n ---`

export const youtubeRouter = createTRPCRouter({
  createTitle: protectedProcedure
    .input(z.string().min(140, 'Give me something, bruv'))
    .mutation(async ({ input: description }): Promise<string | undefined> => {
      try {
        const completion = await OpenAI.createCompletion({
          model: 'text-davinci-003',
          prompt: generatePrompt(description),
          max_tokens: 16
        })

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
        await prisma.title.create({
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
  listTitles: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user
    console.log('UserID', userId)
    try {
      const history = await prisma.title.findMany({
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
        const title = await prisma.title.findUnique({
          where: { id: input }
        })

        if (title?.user !== userId) {
          throw new Error('Title does not belong to you')
        }

        return title
      } catch (error) {
        console.error('`getTitle` failed', error)
      }
    }),
  addPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        contentUrl: z.string().url()
      })
    )
    .mutation(async ({ input, ctx }): Promise<void> => {
      const {
        prisma,
        session: { user }
      } = ctx

      try {
        void (await prisma.post.create({
          data: {
            user: user.id,
            title: input.title,
            contentUrl: input.contentUrl
          }
        }))
      } catch (err) {
        console.error('Adding post failed', err)
      }
    }),
  addProfile: protectedProcedure
    .input(
      z.object({
        platform: z.string(),
        url: z.string().url()
      })
    )
    .mutation(async ({ input, ctx }): Promise<void> => {
      const {
        prisma,
        session: { user }
      } = ctx

      console.log('Adding profile')

      try {
        const existingProfile = await prisma.profile.findUnique({
          where: {
            id: user.id
          }
        })

        if (!existingProfile) {
          return
        }

        const json = existingProfile.socialProfiles
        if (json == null || typeof json !== 'object' || !Array.isArray(json)) {
          return
        }

        const newProfile: SocialProfile = {
          platform: input.platform as Platform,
          url: input.url
        }

        json.push(newProfile as unknown as Prisma.JsonValue)

        await prisma.profile.update({
          where: { id: user.id },
          data: {
            socialProfiles: json
          }
        })
      } catch (error) {}
    })
})
