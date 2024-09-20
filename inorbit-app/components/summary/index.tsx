import React from 'react'

export function Summary({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-y-6 w-full max-w-[480px]">{children}</div>
  )
}
