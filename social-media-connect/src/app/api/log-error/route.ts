// app/api/log-error/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const errorDetails = await request.json()
  console.error('Detailed Auth Error:', JSON.stringify(errorDetails, null, 2))
  
  // Here you could also send this error to an external logging service
  
  return NextResponse.json({ status: 'logged' })
}