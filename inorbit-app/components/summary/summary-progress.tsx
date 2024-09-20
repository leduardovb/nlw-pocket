import { Progress, ProgressIndicator } from '../ui/progress-bar'

interface Props {
  totalCompletedGoals: number
  totalGoalsToComplete: number
}

export function SummaryProgress({
  totalCompletedGoals,
  totalGoalsToComplete,
}: Props) {
  const percentage = Math.floor(
    (totalCompletedGoals / totalGoalsToComplete) * 100
  )

  return (
    <div>
      <Progress value={8} max={15}>
        <ProgressIndicator style={{ width: `${percentage}%` }} />
      </Progress>

      <div className="flex justify-between items-center text-zinc-400 text-xs mt-3">
        <span>
          Você completou{' '}
          <span className="text-zinc-50">{totalCompletedGoals}</span> de{' '}
          <span className="text-zinc-50">{totalGoalsToComplete}</span> metas
          nessa semana.
        </span>
        <span>{percentage}%</span>
      </div>
    </div>
  )
}
