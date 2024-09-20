'use client'

import { PendingGoals } from '@/components/pending-goals'
import { PendingGoalSkeleton } from '@/components/pending-goals/pending-goals-skeleton'
import { usePendingGoals } from '@/hooks/use-pending-goals'

export function PendingGoalsContainer() {
  const { data, isLoading } = usePendingGoals()

  if (isLoading) {
    return <PendingGoalSkeleton />
  }

  if (!data) {
    return null
  }

  return <PendingGoals pendingGoals={data} />
}
