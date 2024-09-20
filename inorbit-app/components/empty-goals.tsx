import Image from 'next/image'
import { CreateGoalTrigger } from './create-goal/create-goal-trigger'

export function EmptyGoals() {
  return (
    <>
      <Image alt="logo" src={'/images/logo.png'} width={115} height={36} />
      <Image
        alt="logo"
        src={'/images/lets-start.png'}
        width={320}
        height={320}
      />

      <p className="text-center leading-relaxed max-w-80 text-zinc-300">
        Você ainda não cadastrou nenhuma meta, que tal <u>cadastrar um</u> agora
        mesmo?
      </p>

      <CreateGoalTrigger />
    </>
  )
}
