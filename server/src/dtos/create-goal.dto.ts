import z from 'zod'

export const CreateGoalSchema = z.object({
  title: z.string().trim().min(1),
  desiredWeeklyFrequency: z.number().int().min(1).max(7),
})

export type CreateGoalDTO = z.infer<typeof CreateGoalSchema>
