import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { ResponseDTO } from '../../dtos/response.dto'
import { CreateGoalCompletionSchema } from '../../dtos/create-goal-completion.dto'
import { createGoalCompletion } from '../../functions/create-goal-completin'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/goals/:id/completion',
    { schema: { params: CreateGoalCompletionSchema } },
    async (req, res) => {
      const { id } = req.params

      try {
        await createGoalCompletion({ id })

        res.status(201).send(ResponseDTO.make(201, 'Goal completion created'))
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(400).send(ResponseDTO.make(400, message))
      }
    }
  )
}
