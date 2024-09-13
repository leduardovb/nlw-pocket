import { and, count, eq, gte, lte, sql, type SQLWrapper } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

export const firstDayOfWeek = () => dayjs().startOf('week').toDate()
export const lastDayOfWeek = () => dayjs().endOf('week').toDate()

export const goalsCompletionCounts = (
  ...conditions: (SQLWrapper | undefined)[]
) =>
  db.$with('goals_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.completedAt, firstDayOfWeek()),
          lte(goalCompletions.completedAt, lastDayOfWeek()),
          ...conditions
        )
      )
      .groupBy(goalCompletions.goalId)
  )

export const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
  db
    .select({
      id: goals.id,
      title: goals.title,
      desireWeeklyFrequency: goals.desiredWeeklyFrequency,
      createdAt: goals.createdAt,
    })
    .from(goals)
    .where(lte(goals.createdAt, lastDayOfWeek()))
)

export async function getWeekPendingGoals() {
  const count = goalsCompletionCounts()

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, count)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desireWeeklyFrequency,
      completionCount: sql`COALESCE(${count.completionCount}, 0)`.mapWith(
        Number
      ),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(count, eq(count.goalId, goalsCreatedUpToWeek.id))

  return { pendingGoals }
}
