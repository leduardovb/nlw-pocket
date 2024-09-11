import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Aprender a programar', desiredWeeklyFrequency: 3 },
      { title: 'Fazer exercícios físicos', desiredWeeklyFrequency: 2 },
      { title: 'Ler livros', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const goalIds = result.map((goal) => goal.id)

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: goalIds[0], completedAt: startOfWeek.toDate() },
    { goalId: goalIds[2], completedAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => client.end())
