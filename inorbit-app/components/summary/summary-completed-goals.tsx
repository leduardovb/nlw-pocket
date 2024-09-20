import { CompletedGoals } from '@/http/goals/get-summary'
import dayjs from 'dayjs'
import { CircleCheck } from 'lucide-react'
import React from 'react'

interface Props {
  totalCompletedGoals: number
  completedGoals: CompletedGoals
}

export function SummaryCompletedGoals({
  completedGoals,
  totalCompletedGoals,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-zinc-50 text-xl font-medium">Sua semana</h2>
      {totalCompletedGoals === 0 && (
        <p className="text-sm text-zinc-400">
          Você ainda não completou nenhuma meta essa semana.
        </p>
      )}

      {Object.entries(completedGoals).map(
        ([date, { friendlyDayName, goals }]) => (
          <div key={date} className="flex flex-col gap-y-4">
            <h3 className="text-zinc-50 text-base font-medium">
              {friendlyDayName}{' '}
              <span className="text-xs text-zinc-400">
                ({dayjs(date).format('D MMMM')})
              </span>
            </h3>

            <ul className="flex flex-col gap-y-3">
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex items-center gap-x-2 text-sm text-zinc-400"
                >
                  <CircleCheck className="size-4 text-pink-400" />
                  <span>
                    Você completou &quot;
                    <span className="text-zinc-50">{goal.title}</span>&quot; às{' '}
                    <span className="text-zinc-50">
                      {dayjs(goal.completedAt).format('HH:MM')}h
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  )
}
