'use server'

import { http } from '@/lib/api/http'
import { makeApiUrl } from '@/lib/make-api-url'

interface CreateGoalCompletionDTO {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionDTO) {
  await http.request({
    url: makeApiUrl(`/goals/${goalId}/completion`),
    method: 'POST',
  })
}
