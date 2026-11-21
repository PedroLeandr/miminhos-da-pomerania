import { cookies } from 'next/headers'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { sessionCookie, validSession } from '@/lib/photo-auth'
import { isGallerySlot, isPhotoSlot, maxCaptionLength } from '@/lib/photo-slots'
import { photoDirectory, saveCaption, savePhoto } from '@/lib/photo-storage'

type Context = { params: Promise<{ id: string }> }
const maxUpload = 4 * 1024 * 1024

export async function GET(_: Request, { params }: Context) {
  const { id } = await params
  if (!isPhotoSlot(id) || process.env.VERCEL) return new Response(null, { status: 404 })
  try {
    const image = await readFile(path.join(photoDirectory, `${id}.webp`))
    return new Response(new Uint8Array(image), {
      headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    return new Response(null, { status: 404 })
  }
}

async function checkWriteAccess(request: Request) {
  if (!validSession((await cookies()).get(sessionCookie)?.value)) {
    return Response.json({ error: 'A sessão terminou. Volte a iniciar sessão.' }, { status: 401 })
  }
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (!host || (origin !== `http://${host}` && origin !== `https://${host}`)) {
    return Response.json({ error: 'Pedido inválido.' }, { status: 403 })
  }
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'O armazenamento de fotos ainda não está configurado.' }, { status: 503 })
  }
}

export async function POST(request: Request, { params }: Context) {
  const { id } = await params
  if (!isPhotoSlot(id)) return Response.json({ error: 'Foto desconhecida.' }, { status: 404 })
  const errorResponse = await checkWriteAccess(request)
  if (errorResponse) return errorResponse
  const length = Number(request.headers.get('content-length'))
  if (!Number.isInteger(length) || length < 1 || length > maxUpload) {
    return Response.json({ error: 'Escolha uma imagem até 4 MB.' }, { status: 413 })
  }

  let image: Buffer
  try {
    const bytes = await request.arrayBuffer()
    if (bytes.byteLength > maxUpload) {
      return Response.json({ error: 'Escolha uma imagem até 4 MB.' }, { status: 413 })
    }
    const source = sharp(Buffer.from(bytes), { limitInputPixels: 50_000_000 })
    const { format } = await source.metadata()
    if (format !== 'jpeg' && format !== 'png' && format !== 'webp') throw new Error('Formato inválido')
    image = await source.rotate().resize(1800, 1800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86 }).toBuffer()
  } catch {
    return Response.json({ error: 'Escolha uma imagem JPEG, PNG ou WebP válida.' }, { status: 400 })
  }
  try {
    return Response.json({ src: await savePhoto(id, image) })
  } catch (error) {
    console.error('Erro ao guardar foto', id, error)
    return Response.json({ error: 'Não foi possível guardar a foto. Tente novamente.' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params
  if (!isGallerySlot(id)) return Response.json({ error: 'Foto da galeria desconhecida.' }, { status: 404 })
  const errorResponse = await checkWriteAccess(request)
  if (errorResponse) return errorResponse

  const length = Number(request.headers.get('content-length'))
  if (length < 1 || length > 1024 || !Number.isInteger(length)) {
    return Response.json({ error: 'Legenda inválida.' }, { status: 400 })
  }
  const body = await request.json().catch(() => null)
  if (typeof body?.caption !== 'string' || !body.caption.trim() || body.caption.trim().length > maxCaptionLength) {
    return Response.json({ error: 'Escreva uma legenda entre 1 e 100 caracteres.' }, { status: 400 })
  }
  const caption = body.caption.trim()
  try {
    await saveCaption(id, caption)
    return Response.json({ caption })
  } catch (error) {
    console.error('Erro ao guardar legenda', id, error)
    return Response.json({ error: 'Não foi possível guardar a legenda. Tente novamente.' }, { status: 500 })
  }
}
