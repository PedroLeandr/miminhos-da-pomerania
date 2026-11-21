'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSession, sessionCookie, sessionSeconds, validLogin } from '@/lib/photo-auth'

export async function login(form: FormData) {
  if (!validLogin(String(form.get('username') ?? ''), String(form.get('password') ?? ''))) {
    redirect('/admin/fotos?erro=login')
  }
  const jar = await cookies()
  jar.set(sessionCookie, createSession(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: !!process.env.VERCEL,
    path: '/',
    maxAge: sessionSeconds,
  })
  redirect('/admin/fotos')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(sessionCookie)
  redirect('/admin/fotos')
}
