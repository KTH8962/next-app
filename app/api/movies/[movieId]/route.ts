import type { NextRequest } from "next/server"

type Context = {
  params: { movieId: string }
}

export async function GET(request: NextRequest, context: Context) {
  const { movieId } = context.params // 동적 경로
  const res = await fetch(
    `https://omdbapi.com/?apikey=${process.env.NEXT_API_KEY}&i=${movieId}`
  )
  const data = await res.json()
  return Response.json(data)
}
