'use client'

import { SummaryCompletedGoals } from '@/components/summary/summary-completed-goals'
import { useSummary } from '@/hooks/use-summary'
import { SummaryResponse } from '@/http/goals/get-summary'

interface Props {
  initialData?: SummaryResponse
}

export function SummaryCompletedGoalsContainer(props?: Props) {
  const { data: summary } = useSummary({ initialData: props?.initialData })

  if (!summary) {
    return null
  }

  return (
    <SummaryCompletedGoals
      completedGoals={summary.completedGoals}
      totalCompletedGoals={summary.totalCompletedGoals}
    />
  )
}
