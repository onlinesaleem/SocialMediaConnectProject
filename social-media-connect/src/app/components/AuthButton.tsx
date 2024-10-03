// components/AuthButton.tsx
'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div>
        Signed in as {session.user.email ?? session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn("twitter")}>Sign in with Twitter</button>
    </div>
  )
}