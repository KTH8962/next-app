import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "path-to-regexp"

const getSession = async () => {
  return false // 임시 데이터 반환!
}
const matchersForAuth = [
  "/dashboard{/*path}",
  "/myaccount{/*path}",
  "/settings{/*path}",
]

// 미들웨어 함수
export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/signin", request.url))
  }
  return NextResponse.next()
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname))
}
