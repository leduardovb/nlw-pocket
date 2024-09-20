'use client'

import Image from 'next/image'

export default function HomeErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-10">
      <div className="flex flex-col items-center gap-y-8">
        <Image alt="logo" src={'/images/logo.png'} width={115} height={36} />
        <Image
          alt="logo"
          src={'/images/lets-start.png'}
          width={320}
          height={320}
        />
        <p className="text-center leading-relaxed max-w-80 text-zinc-300">
          Ocorreu um erro ao carregar a página, tente novamente.
        </p>
      </div>
    </div>
  )
}
