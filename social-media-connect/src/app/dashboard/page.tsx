// src/app/dashboard/page.tsx

"use client"

import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession()

  if (!session) {
    return <p>You need to sign in</p>
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.email}!</h1>
      <p>This is your dashboard.</p>
    </div>
  )
}

export default Dashboard
