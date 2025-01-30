import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // request.nextUrl.pathname에서 동적 경로 매개변수(movieId) 추출
  const movieId = request.nextUrl.pathname.split("/").pop()

  if (!movieId) {
    return new Response("Movie ID is missing", { status: 400 })
  }

  const res = await fetch(
    `https://omdbapi.com/?apikey=${process.env.NEXT_API_KEY}&i=${movieId}`
  )
  const data = await res.json()

  return Response.json(data)
}
