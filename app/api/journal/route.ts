
import { prisma } from "@/utils/db"
import { getUserFromClerkID } from "@/utils/auth"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day here!',
    },
  })
  
  return NextResponse.json({data: entry})

}
