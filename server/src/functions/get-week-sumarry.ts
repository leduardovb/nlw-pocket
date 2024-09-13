import { and, eq, gte, lte, sum } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { firstDayOfWeek, lastDayOfWeek } from './get-week-pending-goals'
import dayjs from 'dayjs'

interface CompletedGoals {
  friendlyDayName: string
  goals: Array<{
    id: string
    title: string
    completedAt: Date
  }>
}

const today = new Date()

export async function getWeekSummary() {
  const [{ quantity }] = await db
    .select({
      quantity: sum(goals.desiredWeeklyFrequency)
        .mapWith(Number)
        .as('quantity'),
    })
    .from(goals)

  const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completedAt: goalCompletions.completedAt,
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.completedAt, firstDayOfWeek()),
          lte(goalCompletions.completedAt, lastDayOfWeek())
        )
      )
  )

  const completedGoals = await db
    .with(goalsCompletedInWeek)
    .select({
      id: goals.id,
      title: goals.title,
      completedAt: goalsCompletedInWeek.completedAt,
    })
    .from(goals)
    .innerJoin(goalsCompletedInWeek, eq(goals.id, goalsCompletedInWeek.goalId))
    .orderBy(goalsCompletedInWeek.completedAt)

  const aggregateGoalsByDay = completedGoals.reduce((acc, goal) => {
    const date = dayjs(goal.completedAt).format('YYYY-MM-DD')
    acc[date] = acc[date] || {
      friendlyDayName: translateDayToPortuguese(goal.completedAt),
      goals: [],
    }
    acc[date].goals.push({
      id: goal.id,
      title: goal.title,
      completedAt: goal.completedAt,
    })
    return acc
  }, {} as Record<string, CompletedGoals>)

  return { completedGoals: aggregateGoalsByDay, quantity }
}

const translateDayToPortuguese = (completedAt: Date) => {
  const day = dayjs(completedAt).format('dddd')
  const isToday = dayjs(completedAt).isSame(today, 'day')

  if (isToday) {
    return 'Hoje'
  }

  const isYesterday = dayjs(completedAt).isSame(today, 'day')

  if (isYesterday) {
    return 'Ontem'
  }

  switch (day) {
    case 'Sunday':
      return 'Domingo'
    case 'Monday':
      return 'Segunda-feira'
    case 'Tuesday':
      return 'Terça-feira'
    case 'Wednesday':
      return 'Quarta-feira'
    case 'Thursday':
      return 'Quinta-feira'
    case 'Friday':
      return 'Sexta-feira'
    case 'Saturday':
      return 'Sábado'
    default:
      return day
  }
}
