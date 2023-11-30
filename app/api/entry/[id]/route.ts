// import { update } from '@/utils/actions'
// import { analyzeEntry } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const DELETE = async (request: Request, { params }) => {
  const user = await getUserFromClerkID()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  // update(['/journal'])

  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request: Request, { params }) => {
  const { updates } = await request.json()
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: {
      content: updates,
    },
  })

  // const analysis = await analyzeEntry(entry)
  // const savedAnalysis = await prisma.entryAnalysis.upsert({
  //   where: {
  //     entryId: entry.id,
  //   },
  //   update: { ...analysis },
  //   create: {
  //     entryId: entry.id,
  //     userId: user.id,
  //     ...analysis,
  //   },
  // })

  // update(['/journal'])

  return NextResponse.json({ data: { ...entry} })
}
