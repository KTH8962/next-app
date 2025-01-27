export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 px-3 py-2">
      <p className="text-gray-500">(movies) 경로 그룹의 레이아웃</p>
      {children}
    </div>
  )
}
