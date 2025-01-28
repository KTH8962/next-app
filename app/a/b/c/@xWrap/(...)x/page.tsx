"use client"

import { useRouter } from "next/navigation"

export default function XPage() {
  const router = useRouter()
  return (
    <>
      <h1>Intercepted X Page!!</h1>
      <button
        type="button"
        onClick={() => {
          router.back()
        }}
      >
        닫기
      </button>
    </>
  )
}
