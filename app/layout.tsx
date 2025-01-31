import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "넥스트 연습",
  description: "넥스트 적용 시키는 연습 프로젝트",
  openGraph: {
    title: "openGraph",
  },
  twitter: {
    title: "sns",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
