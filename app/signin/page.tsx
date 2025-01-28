import { signInWithCredentials } from "@/serverActions/auth"

export default function SignInPage() {
  return (
    <>
      <h1>로그인</h1>
      <form
        action={signInWithCredentials}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
        }}
      >
        <label>
          이메일(ID)
          <input name="email" type="email" />
        </label>
        <label>
          비밀번호
          <input name="password" type="password" />
        </label>
        <button>로그인</button>
      </form>
    </>
  )
}
