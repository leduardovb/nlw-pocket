import z from 'zod'

export const CreateGoalCompletionSchema = z.object({
  id: z.string(),
})

export type CreateGoalCompletionDTO = z.infer<typeof CreateGoalCompletionSchema>
