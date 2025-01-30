import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent", // 사용자에게 항상 동의 화면을 표시하도록 강제!
        },
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
    signIn: async ({ account, profile, user }) => {
      if (account?.provider === "google") {
        // <사용자 확인 후 회원가입 또는 로그인...>
        try {
          console.log("d" + user)
          return !!profile?.email_verified
        } catch (error) {
          return `/error?message=${encodeURIComponent("<ERROR_MESSAGE>")}`
        }
      }
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
        // console.log(
        //   `url : ${url} + url : ${callbackUrl},  + ${search} ,  + ${origin}`
        // )
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
