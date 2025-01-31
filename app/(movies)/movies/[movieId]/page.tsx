import wait from "@/utils/wait"

interface Movie {
  Title: string
  Plot: string
}

type Context = {
  params: { movieId: string }
  searchParams: { plot?: "short" | "full" }
}

type DetailedMovie = {
  Title: string // 영화 제목
  Year: string // 출시 연도
  Rated: string // 등급 (예: PG-13)
  Released: string // 출시일
  Runtime: string // 상영 시간
  Genre: string // 장르
  Director: string // 감독
  Writer: string // 작가
  Actors: string // 배우들
  Plot: string // 줄거리
  Language: string // 언어
  Country: string // 제작 국가
  Awards: string // 수상 내역
  Poster: string // 포스터 이미지 URL
  Ratings: { Source: string; Value: string }[] // 평점 정보 (예: IMDB, Rotten Tomatoes 등)
  Metascore: string // 메타스코어
  imdbRating: string // IMDb 평점
  imdbVotes: string // IMDb 투표 수
  imdbID: string // IMDb 영화 ID
  Type: string // 영화 타입 (예: movie, series)
  DVD: string // DVD 출시일
  BoxOffice: string // 박스오피스 수익
  Production: string // 제작사
  Website: string // 공식 웹사이트
}

async function fetchMovie(
  id: string,
  plot?: "short" | "full"
): Promise<DetailedMovie> {
  const res = await fetch(
    `https://omdbapi.com/?apikey=${process.env.NEXT_API_KEY}&i=${id}&plot=${
      plot || "short"
    }`
  )
  const data = await res.json()
  return data
}

export async function generateMetadata({ params, searchParams }: Context) {
  const plot = searchParams?.plot || "short"
  const movie = await fetchMovie(params.movieId, plot)
  console.log(movie)
  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster,
      url: `https://nextjs-movie-app-steel.vercel.app/movies/${movie.imdbID}`,
      type: "website",
      siteName: "Nextjs Movie App",
      locale: "ko_KR",
    },
  }
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
