import { Summary } from '@/components/summary/index'
import { EmptyGoals } from '../../components/empty-goals'
import { getSummary } from '@/http/goals/get-summary'
import { SummaryHeader } from '@/components/summary/summary-header'
import { CreateGoalTrigger } from '@/components/create-goal/create-goal-trigger'
import { Separator } from '@/components/ui/separator'
import { SummaryProgressContainer } from '@/containers/summary/summary-progress.container'
import { SummaryCompletedGoalsContainer } from '@/containers/summary/summary-completed-goals.container'
import { PendingGoalsContainer } from '@/containers/pending-goals.container'

export default async function HomePage() {
  const summary = await getSummary()

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-y-8 items-center min-h-screen p-10">
        {summary.totalGoalsToComplete ? (
          <Summary>
            <SummaryHeader>
              <CreateGoalTrigger />
            </SummaryHeader>

            <SummaryProgressContainer initialData={summary} />

            <Separator />

            <PendingGoalsContainer />

            <SummaryCompletedGoalsContainer initialData={summary} />
          </Summary>
        ) : (
          <EmptyGoals />
        )}
      </main>
    </div>
  )
}
