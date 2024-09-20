import dayjs from 'dayjs'
import { InOrbitIcon } from '../in-orbit-icon'
import ptBr from 'dayjs/locale/pt-br'

dayjs().locale(ptBr)

export function SummaryHeader({ children }: React.PropsWithChildren) {
  const startWeekDay = dayjs().startOf('week').format('D MMM')
  const endWeekDay = dayjs().endOf('week').format('D MMM')

  return (
    <header className="flex flex-wrap gap-4 justify-between w-full">
      <span className="flex text-zinc-50 text-lg font-semibold">
        <InOrbitIcon />
        <span className="ml-3">
          {startWeekDay} - {endWeekDay}
        </span>
      </span>
      {children}
    </header>
  )
}
