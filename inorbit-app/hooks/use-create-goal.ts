'use client'

import { createGoal } from '@/http/goals/create-goal'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateGoal() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createGoal,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      })
      queryClient.invalidateQueries({
        queryKey: ['pending-goals'],
      })
    },
  })
  return mutation
}
