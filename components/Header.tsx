/* eslint-disable @next/next/no-async-client-component */
//"use client"
//import { usePathname, useRouter } from "next/navigation"
import styles from "./Header.module.scss"
import Link from "next/link"
//import { useEffect } from "react"
import { getSession, signOutWithForm } from "@/serverActions/auth"

// const links = [
//   { href: "/", label: "home" },
//   { href: "/signin", label: "로그인" },
//   { href: "/signup", label: "회원가입" },
//   { href: "/movies", label: "Movies" },
//   { href: "/movies/tt4154796", label: "Movie(Avengers)" },
//   { href: "/async", label: "Async" },
// ]
export default async function Header() {
  //const pathname = usePathname()
  //const router = useRouter()
  const session = await getSession()
  // useEffect(() => {
  //   router.prefetch("moives")
  // }, [router])
  console.log(session)
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>Header</h1>
      <nav>
        <Link href="/">메인</Link>
        {session?.user ? (
          <>
            <form action={signOutWithForm}>
              <button type="submit">로그아웃</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
        {/* {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-2 ${
              pathname === href ? "bg-blue-600 text-white" : ""
            } `}
          >
            {label}
          </Link>
        ))} */}
      </nav>
      {/* <button type="button" onClick={() => router.push("/movies")}>
        Moives(push)
      </button>
      <button onClick={() => router.back()}>back</button>
      <button onClick={() => router.forward()}>forward</button>
      <button onClick={() => router.refresh()}>refresh</button> */}
    </header>
  )
}
