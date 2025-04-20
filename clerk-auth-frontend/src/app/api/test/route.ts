import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const { sessionId } = await auth();
  if (!sessionId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const template = "test";
  const client = await clerkClient();
  const token = await client.sessions.getToken(sessionId, template);
  const res = await fetch("http://localhost:8000/api", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.jwt}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return new Response(
    JSON.stringify({
      data: data,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
