import { z } from 'zod'

const mapStringError = (
  issue: z.ZodIssueOptionalMessage,
  _ctx: z.ErrorMapCtx
) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return {
        message: `Este campo deve ter no mínimo ${issue.minimum} caracteres`,
      }
    case z.ZodIssueCode.too_big:
      return {
        message: `Este campo deve ter no máximo ${issue.maximum} caracteres`,
      }
    default:
      return { message: 'Campo inválido' }
  }
}

export const CommonValidations = {
  string: z.string({ errorMap: mapStringError }),
}
