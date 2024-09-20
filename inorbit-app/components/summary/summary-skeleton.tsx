import { PendingGoalSkeleton } from '../pending-goals/pending-goals-skeleton'
import { Separator } from '../ui/separator'

export function SummarySkeleton() {
  return (
    <div className="flex justify-center min-h-screen p-10">
      <div className="flex flex-col gap-y-6 w-full max-w-[480px] ">
        <header className="flex flex-wrap gap-4 justify-between w-full">
          <span className="flex text-zinc-50 text-lg font-semibold">
            <span className="animate-pulse bg-zinc-50 h-4 w-20 rounded" />
          </span>
        </header>

        <div>
          <div className="animate-pulse bg-zinc-50 h-4 w-full rounded" />
          <div className="flex justify-end items-center text-zinc-400 text-xs mt-3">
            <span className="animate-pulse bg-zinc-50 h-4 w-10 rounded" />
          </div>
        </div>

        <Separator />

        <PendingGoalSkeleton />

        <div className="flex flex-col gap-y-6">
          <div className="animate-pulse bg-zinc-50 h-7 w-32 rounded" />

          <div className="flex flex-col gap-y-4">
            <div className="animate-pulse bg-zinc-50 h-6 w-28 rounded" />
            <div className="animate-pulse bg-zinc-50 h-5 w-full rounded" />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="animate-pulse bg-zinc-50 h-6 w-36 rounded" />
            <div className="animate-pulse bg-zinc-50 h-5 w-full rounded" />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="animate-pulse bg-zinc-50 h-6 w-44 rounded" />
            <div className="animate-pulse bg-zinc-50 h-5 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
