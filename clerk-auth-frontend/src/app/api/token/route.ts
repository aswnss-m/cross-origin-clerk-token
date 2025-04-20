import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  const { sessionId } = await auth()

  if (!sessionId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const template = 'test'
  const client = await clerkClient()
  const token = await client.sessions.getToken(sessionId, template)

  return Response.json({ token })
}