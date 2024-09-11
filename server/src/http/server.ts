import fastify, { type FastifyTypeProvider } from 'fastify'
import { createGoal } from '../functions/create-goal'
import { CreateGoalSchema } from '../dtos/create-goal.dto'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { z, ZodTypeAny } from 'zod'

interface ZodTypeProvider extends FastifyTypeProvider {
  output: this['input'] extends ZodTypeAny ? z.infer<this['input']> : unknown
}

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post('/goals', { schema: { body: CreateGoalSchema } }, async (req, res) => {
  const { title, desiredWeeklyFrequency } = req.body

  const goal = await createGoal({
    title: title,
    desiredWeeklyFrequency: desiredWeeklyFrequency,
  })

  res.status(201).send(goal)
})

app.listen({
  port: 3000,
})
