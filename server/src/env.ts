import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_LOG: z
    .boolean({
      coerce: true,
    })
    .optional(),
})

export const env = envSchema.parse(process.env)
