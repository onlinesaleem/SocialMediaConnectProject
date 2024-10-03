// app/auth/error/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthError() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const logError = async () => {
      const errorDetails = {
        error: searchParams.get('error'),
        description: searchParams.get('error_description'),
        uri: searchParams.get('error_uri'),
        fullUrl: window.location.href,
        params: Object.fromEntries(searchParams.entries()),
      }
      
      console.error('Auth Error Details:', errorDetails)
      
      try {
        const response = await fetch('/api/log-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorDetails),
        })
        if (!response.ok) {
          console.error('Failed to log error details')
        }
      } catch (e) {
        console.error('Error while logging:', e)
      }
    }
    
    logError()
  }, [searchParams])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p>An error occurred during authentication. Details have been logged for further investigation.</p>
      <p className="mt-4">Please try again or contact support if the problem persists.</p>
    </div>
  )
}