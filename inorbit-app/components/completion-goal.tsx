'use client'

import { ButtonHTMLAttributes } from 'react'
import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useCompletionGoal } from '@/hooks/use-completion-goal'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  goalId: string
}

export function CompletionGoal({ goalId, children, ...props }: Props) {
  const { mutate: completionGoal } = useCompletionGoal()

  const handleClick = () => {
    completionGoal({ goalId })
  }

  return (
    <OutlineButton {...props} onClick={handleClick}>
      <Plus className="size-4 text-zinc-600" />
      {children}
    </OutlineButton>
  )
}
