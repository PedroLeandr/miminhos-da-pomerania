import { list, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { mkdir, readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isGallerySlot, isPhotoSlot, type GallerySlot, type PhotoCaptions, type PhotoSlot, type PhotoSources } from './photo-slots'

const prefix = 'site-photos/'
export const photoDirectory = path.join(process.cwd(), '.site-photos')

export async function readPhotos() {
  const sources: PhotoSources = {}
  const captions: PhotoCaptions = {}
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { blobs } = await list({ prefix })
    await Promise.all(blobs.map(async blob => {
      const id = path.posix.basename(blob.pathname, '.webp')
      if (isPhotoSlot(id) && blob.pathname === `${prefix}${id}.webp`) {
        sources[id] = `${blob.url}?v=${blob.uploadedAt.getTime()}`
      } else if (blob.pathname.endsWith('.txt')) {
        const slot = path.posix.basename(blob.pathname, '.txt')
        if (isGallerySlot(slot) && blob.pathname === `${prefix}${slot}.txt`) {
          const response = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, { cache: 'no-store' })
          if (response.ok) captions[slot] = await response.text()
        }
      }
    }))
  } else if (!process.env.VERCEL) {
    try {
      const files = await readdir(photoDirectory)
      await Promise.all(files.map(async file => {
        const id = path.basename(file, '.webp')
        if (isPhotoSlot(id) && file === `${id}.webp`) sources[id] = `/api/fotos/${id}`
        if (file.endsWith('.txt')) {
          const slot = path.basename(file, '.txt')
          if (isGallerySlot(slot)) captions[slot] = await readFile(path.join(photoDirectory, file), 'utf8')
        }
      }))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  }
  return { sources, captions }
}

export async function saveCaption(id: GallerySlot, caption: string) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(`${prefix}${id}.txt`, caption, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'text/plain; charset=utf-8',
      cacheControlMaxAge: 60,
    })
  } else {
    await saveLocal(`${id}.txt`, caption)
  }
}

export async function savePhoto(id: PhotoSlot, image: Buffer) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${prefix}${id}.webp`, image, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'image/webp',
      cacheControlMaxAge: 60,
    })
    return `${blob.url}?v=${encodeURIComponent(blob.etag)}`
  }
  await saveLocal(`${id}.webp`, image)
  return `/api/fotos/${id}?v=${randomUUID()}`
}

async function saveLocal(file: string, contents: Buffer | string) {
  if (process.env.VERCEL) throw new Error('Vercel Blob por configurar')
  await mkdir(photoDirectory, { recursive: true })
  const temporary = path.join(photoDirectory, randomUUID())
  try {
    await writeFile(temporary, contents)
    await rename(temporary, path.join(photoDirectory, file))
  } finally {
    await unlink(temporary).catch(() => {})
  }
}
