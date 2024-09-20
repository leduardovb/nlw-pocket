import z from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  DATABASE_URL: z.string().url(),
  DATABASE_LOG: z
    .string()
    .optional()
    .transform((v) => {
      return v === 'true'
    }),
})

export const env = envSchema.parse(process.env)
