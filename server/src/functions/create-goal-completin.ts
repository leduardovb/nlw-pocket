import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import type { CreateGoalCompletionDTO } from '../dtos/create-goal-completion.dto'
import { goalsCompletionCounts } from './get-week-pending-goals'

export async function createGoalCompletion({ id }: CreateGoalCompletionDTO) {
  const hasAlreadyCompletedToday = await db
    .select()
    .from(goalCompletions)
    .where(
      and(
        eq(goalCompletions.goalId, id),
        eq(
          sql`DATE_TRUNC('day', ${goalCompletions.completedAt})`,
          sql`DATE_TRUNC('day', NOW())`
        )
      )
    )

  if (hasAlreadyCompletedToday.length > 0) {
    throw new Error('Goal already completed today')
  }

  const count = goalsCompletionCounts(eq(goalCompletions.goalId, id))

  const [{ completionCount, desiredWeeklyFrequency }] = await db
    .with(count)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`COALESCE(${count.completionCount}, 0)`.mapWith(
        Number
      ),
    })
    .from(goals)
    .leftJoin(count, eq(count.goalId, goals.id))

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed')
  }

  const [insertResult] = await db
    .insert(goalCompletions)
    .values({
      goalId: id,
    })
    .returning()

  return { insertResult }
}
