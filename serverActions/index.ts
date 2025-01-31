"use server"
export async function wait(duration = 1000): Promise<{ message: string }> {
  console.log(`Run 'wait' function`)
  return new Promise((resolve) =>
    setTimeout(() => resolve({ message: `Waited for ${duration}ms` }), duration)
  )
}
