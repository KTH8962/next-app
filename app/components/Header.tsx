"use client"
import { usePathname, useRouter } from "next/navigation"
import styles from "./Header.module.scss"
import Link from "next/link"
import { useEffect } from "react"

const links = [
  { href: "/", label: "home" },
  { href: "/movies", label: "Movies" },
  { href: "/movies/tt4154796", label: "Movie(Avengers)" },
  { href: "/async", label: "Async" },
]
export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    router.prefetch("moives")
  }, [router])
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>Header</h1>
      <nav>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-2 ${
              pathname === href ? "bg-blue-600 text-white" : ""
            } `}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button type="button" onClick={() => router.push("/movies")}>
        Moives(push)
      </button>
      <button onClick={() => router.back()}>back</button>
      <button onClick={() => router.forward()}>forward</button>
      <button onClick={() => router.refresh()}>refresh</button>
    </header>
  )
}
