'use server'

import { http } from '@/lib/api/http'
import { makeApiUrl } from '@/lib/make-api-url'
import { ResponseDTO } from '@/types/response-dto'

export interface PendingGoal {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
  lastCompletionAt: Date | null
}

export async function getPendingGoals() {
  const response = await http.request<ResponseDTO<Array<PendingGoal>>>({
    method: 'GET',
    url: makeApiUrl('/goals/pending'),
  })

  return response.data
}
