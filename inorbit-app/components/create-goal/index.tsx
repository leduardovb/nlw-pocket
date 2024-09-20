'use client'

import Image from 'next/image'
import { DialogClose, DialogDescription, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateGoalSchema } from '@/lib/zod/schemas/create-goal.schema'
import { FormError } from '../form-error'
import { useCreateGoal } from '@/hooks/use-create-goal'
import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

const Frequencies = [
  {
    value: '1',
    label: '1x na semana',
    icon: '/icons/1-frequency.png',
  },
  { value: '2', label: '2x na semana', icon: '/icons/2-frequency.png' },
  { value: '3', label: '3x na semana', icon: '/icons/3-frequency.png' },
  { value: '4', label: '4x na semana', icon: '/icons/4-frequency.png' },
  { value: '5', label: '5x na semana', icon: '/icons/5-frequency.png' },
  { value: '6', label: '6x na semana', icon: '/icons/6-frequency.png' },
  { value: '7', label: 'Todos os dias', icon: '/icons/7-frequency.png' },
]

export default function CreateGoal({ onClose }: Props) {
  const { mutateAsync: createGoalAsync, isPending, isError } = useCreateGoal()
  const { register, control, handleSubmit, formState } =
    useForm<CreateGoalSchema>({
      resolver: zodResolver(CreateGoalSchema),
    })

  const handleCreateGoal = async (data: CreateGoalSchema) => {
    await createGoalAsync(data)
    onClose()
  }

  useEffect(() => {
    if (isError) {
      alert('Ocorreu um erro ao tentar cadastrar a meta.')
    }
  }, [])

  return (
    <>
      <DialogTitle>Cadastrar meta</DialogTitle>
      <DialogDescription>
        Adicione atividades que <u>te fazem bem</u> e que você quer continuar
        praticando toda semana.
      </DialogDescription>

      <form
        className="flex flex-col h-full gap-y-6 mt-6"
        onSubmit={handleSubmit(handleCreateGoal)}
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Qual a atividade?</Label>
          <Input
            id="title"
            type="text"
            placeholder="Praticar exercícios, meditar, etc..."
            {...register('title')}
          />
          <FormError name="title" errors={formState.errors} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="desiredWeeklyFrequency">
            Quantas vezes na semana?
          </Label>

          <Controller
            control={control}
            defaultValue={1}
            name="desiredWeeklyFrequency"
            render={({ field: { onChange, value, ...field } }) => (
              <RadioGroup
                defaultValue="1"
                value={String(value)}
                onValueChange={onChange}
                {...field}
              >
                {Frequencies.map((frequency) => (
                  <RadioGroupItem key={frequency.value} value={frequency.value}>
                    <RadioGroupIndicator />
                    {frequency.label}
                    <Image
                      width={18}
                      height={18}
                      src={frequency.icon}
                      alt={frequency.icon}
                    />
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        <div className="w-full mt-auto flex gap-x-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={isPending}
            >
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && (
              <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
            )}
            Cadastrar
          </Button>
        </div>
      </form>
    </>
  )
}
