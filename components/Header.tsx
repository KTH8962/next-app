/* eslint-disable @next/next/no-async-client-component */
//"use client"
//import { usePathname, useRouter } from "next/navigation"
import styles from "./Header.module.scss"
import Link from "next/link"
//import { useEffect } from "react"
import { getSession, signOutWithForm } from "@/serverActions/auth"
import Image from "next/image"

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
  const userInfo = session?.user
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>Header</h1>
      {userInfo ? (
        <div className={styles.google}>
          <figure className={styles.imgBox}>
            <Image
              src={userInfo?.image ?? ""}
              alt={userInfo?.name ?? ""}
              width={100}
              height={100}
            />
          </figure>
          <p className={styles.imgName}>{userInfo?.name}</p>
        </div>
      ) : (
        ""
      )}
      <nav>
        <Link href="/">메인</Link>
        {userInfo ? (
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
