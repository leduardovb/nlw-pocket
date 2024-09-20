'use client'

import { getPendingGoals } from '@/http/goals/get-pending-goals'
import { useQuery } from '@tanstack/react-query'

export function usePendingGoals() {
  const query = useQuery({
    queryKey: ['pending-goals'],
    queryFn: () => getPendingGoals(),
  })
  return query
}
