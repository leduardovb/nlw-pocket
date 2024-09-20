'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import CreateGoal from '.'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

export function CreateGoalTrigger({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button size="sm">
            <Plus className="size-4" /> Cadastrar meta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <CreateGoal onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
