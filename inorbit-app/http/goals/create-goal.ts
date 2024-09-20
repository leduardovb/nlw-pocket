'use server'

import { http } from '@/lib/api/http'
import { makeApiUrl } from '@/lib/make-api-url'

interface CreateGoalDTO {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal(dto: CreateGoalDTO) {
  await http.request({
    body: dto,
    method: 'POST',
    url: makeApiUrl('/goals'),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
