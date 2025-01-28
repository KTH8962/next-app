import wait from "@/app/utils/wait"

interface Movie {
  Title: string
  Plot: string
}

export default async function MovieDetails({
  params, // 동적 세그먼트
  searchParams, // 쿼리스트링
}: {
  params: Promise<{ movieId: string }>
  searchParams: Promise<{ plot?: "short" | "full" }>
}) {
  const { movieId } = await params
  const { plot } = await searchParams
  await wait(500)
  //throw new Error("뭔가 문제가 있어요..")
  const res = await fetch(
    `https://omdbapi.com/?apikey=${
      process.env.NEXT_API_KEY
    }&i=${movieId}&plot=${plot || "short"}`
  )
  const movie: Movie = await res.json()
  return (
    <>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
    </>
  )
}
