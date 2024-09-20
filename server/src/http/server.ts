import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal.route'
import { createGoalCompletionRoute } from './routes/create-goal-completion.route'
import { getPendingGoalsRoute } from './routes/get-pendind-goals.route'
import { getWeekSummaryRoute } from './routes/get-week-summary.route'
import { env } from '../env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(createGoalCompletionRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server listening on port ${env.PORT}`)
  })
