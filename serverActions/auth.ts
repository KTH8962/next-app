"use server"
import { auth, signIn, signOut, update } from "@/auth"

export const signInWithCredentials = async (formData: FormData) => {
  console.log(formData)
  await signIn("credentials", {
    displayName: formData.get("displayName") || "", // `'null'` 문자 방지
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    // redirectTo: '/' // 로그인 후 메인 페이지로 이동!
  })
  // ...
}
export const signInWithGoogle = async () => {
  await signIn("google", {
    /* 옵션 */
  })
  // ...
}
export const signInWithGitHub = async () => {
  await signIn("github", {
    /* 옵션 */
  })
  // ...
}
export const signOutWithForm = async (formData: FormData) => {
  console.log(formData)
  await signOut()
}
export { auth as getSession, update as updateSession }
