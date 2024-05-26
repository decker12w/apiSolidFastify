import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  save(checkIn: CheckIn): Promise<CheckIn>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(id: string, page: number): Promise<CheckIn[]>
  findById(userId: string): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
}
