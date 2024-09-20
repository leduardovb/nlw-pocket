import { PendingGoal } from '@/http/goals/get-pending-goals'
import dayjs from 'dayjs'
import { CompletionGoal } from '../completion-goal'

interface Props {
  pendingGoals: Array<PendingGoal>
}

export function PendingGoals({ pendingGoals }: Props) {
  const isDisabledCompletionGoal = (
    completionCount: number,
    desiredWeeklyFrequency: number,
    lastCompletionAt: Date | null
  ) => {
    return (
      completionCount >= desiredWeeklyFrequency ||
      (!!lastCompletionAt &&
        dayjs(lastCompletionAt).format('YYYY-MM-DD') ===
          dayjs().format('YYYY-MM-DD'))
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map((goal) => (
        <CompletionGoal
          key={goal.id}
          goalId={goal.id}
          disabled={isDisabledCompletionGoal(
            goal.completionCount,
            goal.desiredWeeklyFrequency,
            goal.lastCompletionAt
          )}
        >
          {goal.title}
        </CompletionGoal>
      ))}
    </div>
  )
}
