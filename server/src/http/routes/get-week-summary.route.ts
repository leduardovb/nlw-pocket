import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { ResponseDTO } from '../../dtos/response.dto'
import { getWeekSummary } from '../../functions/get-week-sumarry'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/goals/summary', async (_, res) => {
    console.log('GET /goals/summary')

    const { completedGoals, totalCompletedGoals, quantity } =
      await getWeekSummary()
    res.status(201).send(
      ResponseDTO.make(201, {
        completedGoals,
        totalCompletedGoals,
        totalGoalsToComplete: quantity,
      })
    )
  })
}
