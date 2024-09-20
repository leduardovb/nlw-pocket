'use client'

import { getSummary, SummaryResponse } from '@/http/goals/get-summary'
import { useQuery } from '@tanstack/react-query'

interface Props {
  initialData?: SummaryResponse
}

export function useSummary(props?: Props) {
  const query = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary(),
    staleTime: 1000 * 60,
    initialData: props?.initialData,
  })
  return query
}
