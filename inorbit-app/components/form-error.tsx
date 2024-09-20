interface Props {
  name: string
  errors: Record<string, unknown>
}

const getErrorMessage = (name: string, errors: Record<string, unknown>) => {
  const split = name.split('.')

  if (split.length === 1) {
    const error = errors[split[0]] as Record<string, unknown>
    return error?.message as string
  }

  let error: Record<string, unknown> = errors[split[0]] as Record<
    string,
    unknown
  >

  split.forEach((item, index) => {
    if (index === split.length - 1) {
      error = error[item] as Record<string, unknown>
    } else {
      error = error[item] as Record<string, unknown>
    }
  })

  return error?.message as string
}

export function FormError({ name, errors }: Props) {
  const message = getErrorMessage(name, errors)

  if (message) {
    return <div className="text-red-400 text-xs">{message}</div>
  } else {
    return null
  }
}
