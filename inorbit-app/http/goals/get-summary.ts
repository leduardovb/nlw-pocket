'use server'

import { http } from '@/lib/api/http'
import { makeApiUrl } from '@/lib/make-api-url'
import { ResponseDTO } from '@/types/response-dto'

export type CompletedGoals = {
  [date: string]: {
    friendlyDayName: string
    goals: Array<{
      id: string
      title: string
      completedAt: string
    }>
  }
}

export interface SummaryResponse {
  completedGoals: CompletedGoals
  totalCompletedGoals: number
  totalGoalsToComplete: number
}

export const getSummary = async () => {
  const response = await http.request<ResponseDTO<SummaryResponse>>({
    method: 'GET',
    url: makeApiUrl('/goals/summary'),
  })

  return response.data
}
