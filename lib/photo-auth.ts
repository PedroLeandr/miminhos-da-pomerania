import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

export const sessionCookie = 'miminhos_fotos'
export const sessionSeconds = 8 * 60 * 60
const account = 'miminhosdapomerania@hotmail.com'
const fixedPasswordHash = '89ee78efe1a2bfb4ce819a37b5b7d796f71eace72b7d29f4e1371415431cbf15'
const localSession = globalThis as typeof globalThis & { photoSessionKey?: Buffer }

function sign(expiry: string) {
  const key = process.env.PHOTO_ADMIN_PASSWORD || process.env.BLOB_READ_WRITE_TOKEN
    || (localSession.photoSessionKey ??= randomBytes(32))
  return createHmac('sha256', key).update(expiry).digest('hex')
}

function equal(left: string, right: string) {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function validLogin(username: string, password: string) {
  const hash = (value: string) => createHash('sha256').update(value).digest('hex')
  const expectedHash = process.env.PHOTO_ADMIN_PASSWORD
    ? hash(process.env.PHOTO_ADMIN_PASSWORD)
    : fixedPasswordHash
  return username === account && equal(hash(password), expectedHash)
}

export function createSession() {
  const expiry = String(Date.now() + sessionSeconds * 1000)
  return `${expiry}.${sign(expiry)}`
}

export function validSession(session?: string) {
  if (!session) return false
  const [expiry, signature, extra] = session.split('.')
  return extra === undefined && /^\d{13}$/.test(expiry) && Number(expiry) > Date.now()
    && !!signature && equal(signature, sign(expiry))
}
