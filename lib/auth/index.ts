import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('AccessToken')
  if (!token) return { status: false, payload: null }
  try {
    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    )
    return { status: true, payload: verified.payload }
  } catch (err) {
    return { status: false, payload: null }
  }
}
