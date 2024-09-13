import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { ResponseDTO } from '../../dtos/response.dto'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/goals/pending', async (_, res) => {
    const { pendingGoals } = await getWeekPendingGoals()

    res.status(200).send(ResponseDTO.make(200, pendingGoals))
  })
}
