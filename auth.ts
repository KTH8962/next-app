import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { displayName, email, password } = credentials
        const user = { id: "", name: "", email: "", image: "" }

        // 사용자 이름이 있는 경우, 회원가입!
        if (displayName) {
          // <회원가입 로직 ...>
          return { ...user, accessToken: "<ACCESS_TOKEN>" }
        }

        // <로그인 로직 ...>
        return { ...user, accessToken: "<ACCESS_TOKEN>" }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async () => {
      return true
    },
    jwt: async ({ token, user }) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url) {
        const { search, origin } = new URL(url)
        const callbackUrl = new URLSearchParams(search).get("callbackUrl")
        console.log(
          `url : ${url} + url : ${callbackUrl},  + ${search} ,  + ${origin}`
        )
        if (callbackUrl)
          return callbackUrl.startsWith("/")
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl
        if (origin === baseUrl) return url
      }
      return baseUrl
    },
  },
})
