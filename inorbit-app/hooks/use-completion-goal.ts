import { createGoalCompletion } from '@/http/goals/create-goal-completion'
import { PendingGoal } from '@/http/goals/get-pending-goals'
import { SummaryResponse } from '@/http/goals/get-summary'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

export function useCompletionGoal() {
  const queryClient = useQueryClient()

  const updateSummaryCache = (
    goalId: string,
    pendingGoals?: Array<PendingGoal>
  ) => {
    const previousSummary = queryClient.getQueryData<SummaryResponse>([
      'summary',
    ])

    queryClient.setQueryData<SummaryResponse>(['summary'], (summary) => {
      if (!summary) {
        return summary
      }

      const date = new Date()

      summary.totalCompletedGoals += 1

      const currentCompletedGoals =
        summary.completedGoals[dayjs(date).format('YYYY-MM-DD')]
      const pendingGoal = pendingGoals?.find((goal) => goal.id === goalId)

      summary.completedGoals[dayjs(date).format('YYYY-MM-DD')] = {
        friendlyDayName: dayjs(date).locale(ptBr).format('dddd'),
        goals: [
          ...(currentCompletedGoals?.goals || []),
          {
            id: goalId,
            title: pendingGoal?.title || '',
            completedAt: date.toISOString(),
          },
        ],
      }

      return summary
    })

    return { previousSummary }
  }

  const updatePendingGoalsCache = (goalId: string) => {
    const previousPendingGoals = queryClient.getQueryData<Array<PendingGoal>>([
      'pending-goals',
    ])

    queryClient.setQueryData<Array<PendingGoal>>(['pending-goals'], (goals) => {
      if (!goals) {
        return goals
      }

      return goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            completionCount: goal.completionCount + 1,
            lastCompletionAt: new Date(),
          }
        }

        return goal
      })
    })

    return { previousPendingGoals }
  }

  const mutation = useMutation({
    mutationFn: createGoalCompletion,
    onMutate: ({ goalId }) => {
      const { previousPendingGoals } = updatePendingGoalsCache(goalId)
      const { previousSummary } = updateSummaryCache(
        goalId,
        previousPendingGoals
      )
      return { previousPendingGoals, previousSummary }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['pending-goals'], context?.previousPendingGoals)
      queryClient.setQueryData(['summary'], context?.previousSummary)
    },
  })

  return mutation
}
