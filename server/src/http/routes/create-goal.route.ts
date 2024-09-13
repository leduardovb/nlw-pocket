import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { CreateGoalSchema } from '../../dtos/create-goal.dto'
import { createGoal } from '../../functions/create-goal'
import { ResponseDTO } from '../../dtos/response.dto'

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/goals',
    { schema: { body: CreateGoalSchema } },
    async (req, res) => {
      const { title, desiredWeeklyFrequency } = req.body

      const goal = await createGoal({
        title: title,
        desiredWeeklyFrequency: desiredWeeklyFrequency,
      })

      res.status(201).send(ResponseDTO.make(201, goal))
    }
  )
}
