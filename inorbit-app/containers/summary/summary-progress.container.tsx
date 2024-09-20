'use client'

import { SummaryProgress } from '@/components/summary/summary-progress'
import { useSummary } from '@/hooks/use-summary'
import { SummaryResponse } from '@/http/goals/get-summary'

interface Props {
  initialData?: SummaryResponse
}

export function SummaryProgressContainer(props?: Props) {
  const { data: summary } = useSummary({ initialData: props?.initialData })

  if (!summary) {
    return null
  }

  return (
    <SummaryProgress
      totalCompletedGoals={summary.totalCompletedGoals}
      totalGoalsToComplete={summary.totalGoalsToComplete}
    />
  )
}
