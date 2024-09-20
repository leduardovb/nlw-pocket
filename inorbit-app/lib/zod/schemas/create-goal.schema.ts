import z from 'zod'
import { CommonValidations } from '../common-validations'

export const CreateGoalSchema = z.object({
  title: CommonValidations.string.trim().min(1).max(50),
  desiredWeeklyFrequency: z.coerce.number().int().min(1).max(7),
})

export type CreateGoalSchema = z.infer<typeof CreateGoalSchema>
