import { db } from '../db'
import { goals } from '../db/schema'
import type { CreateGoalDTO } from '../dtos/create-goal.dto'

export async function createGoal(dto: CreateGoalDTO) {
  const [goal] = await db
    .insert(goals)
    .values({
      title: dto.title,
      desiredWeeklyFrequency: dto.desiredWeeklyFrequency,
    })
    .returning()

  return { goal }
}
