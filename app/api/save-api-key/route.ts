import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { apiKey } = await req.json()

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 })
  }

  // In a real-world application, you would want to store this securely,
  // possibly in an encrypted database or using a secure key management service.
  // For this example, we'll just acknowledge receipt of the key.

  return NextResponse.json({ message: "API key received" })
}

