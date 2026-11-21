'use client'

import { useState, type FormEvent } from 'react'
import { maxCaptionLength, photoSlots, type PhotoSlot } from '@/lib/photo-slots'

async function preparePhoto(file: File) {
  if (file.size <= 4 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return file
  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Imagem inválida')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', 0.88))
    if (!blob || blob.size > 4 * 1024 * 1024) throw new Error('Imagem demasiado grande')
    return blob
  } finally {
    bitmap.close()
  }
}

export default function PhotoEditor({ id, src, caption }: { id: PhotoSlot; src: string; caption?: string }) {
  const [current, setCurrent] = useState(src)
  const [text, setText] = useState(caption)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{ message: string; error: boolean }>()
  const { label } = photoSlots[id]

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const selected = new FormData(form).get('photo')
    const file = selected instanceof File && selected.size ? selected : undefined
    if (!file && text === undefined) return
    setStatus(undefined)
    setBusy(true)
    let savedPhoto = false
    try {
      const url = `/api/fotos/${id}`
      if (text !== undefined && !text.trim()) throw new Error('Escreva uma legenda.')
      if (file) {
        let body: Blob
        try {
          body = await preparePhoto(file)
        } catch {
          throw new Error('Escolha uma imagem JPEG, PNG ou WebP válida.')
        }
        const response = await fetch(url, { method: 'POST', body })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error)
        setCurrent(result.src)
        form.reset()
        savedPhoto = true
      }
      if (text !== undefined) {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ caption: text }),
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error)
        setText(result.caption)
      }
      const message = text === undefined ? 'Foto guardada.' : savedPhoto ? 'Foto e legenda guardadas.' : 'Legenda guardada.'
      setStatus({ message, error: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível guardar as alterações.'
      setStatus({ message: savedPhoto ? `Foto guardada. ${message}` : message, error: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={upload} className="min-w-0 rounded-2xl border border-parch-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold">{label}</h3>
      <img src={current} alt={`Imagem atual: ${label}`} loading="lazy"
        className={`mb-4 aspect-[4/3] w-full rounded-lg bg-parch-100 ${id === 'logo' ? 'object-contain' : 'object-cover'}`} />
      <label className="grid gap-1">
        Escolher nova imagem
        <input name="photo" type="file" accept="image/*" required={text === undefined} disabled={busy}
          className="min-h-11 w-full rounded-lg border border-stone-300 p-2 text-sm" />
      </label>
      {text !== undefined && (
        <label className="mt-3 grid gap-1">
          Legenda
          <input value={text} onChange={event => setText(event.target.value)} maxLength={maxCaptionLength}
            required disabled={busy} className="min-h-11 w-full rounded-lg border border-stone-300 px-2" />
        </label>
      )}
      <button disabled={busy} className="mt-3 min-h-11 w-full rounded-lg bg-ink px-4 py-2 font-semibold text-white disabled:opacity-60">
        {busy ? 'A guardar…' : text === undefined ? 'Guardar foto' : 'Guardar alterações'}
      </button>
      {status && <p role={status.error ? 'alert' : 'status'} className={`mt-3 ${status.error ? 'text-red-800' : 'text-green-800'}`}>{status.message}</p>}
    </form>
  )
}
