import wait from "@/utils/wait"

export default async function Abc() {
  await wait(2000)
  return <h2>Abc 컴포넌트!</h2>
}
