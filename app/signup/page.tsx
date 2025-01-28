import { signInWithCredentials } from "@/serverActions/auth"

export default function SignUpPage() {
  return (
    <>
      <h1>회원가입</h1>
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
          사용자 이름
          <input name="displayName" type="text" />
        </label>
        <label>
          이메일(ID)
          <input name="email" type="email" />
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </label>
        <button>회원가입</button>
      </form>
    </>
  )
}
