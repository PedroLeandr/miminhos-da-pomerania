import { cookies } from 'next/headers'
import { sessionCookie, validSession } from '@/lib/photo-auth'
import { currentCaption, isGallerySlot, photoIds, photoSlots } from '@/lib/photo-slots'
import { readPhotos } from '@/lib/photo-storage'
import { login, logout } from './actions'
import PhotoEditor from './photo-editor'

export const metadata = {
  title: 'Gestão de fotos | Miminhos da Pomerânia',
  robots: { index: false, follow: false },
}

const button = 'min-h-11 rounded-lg bg-ink px-5 py-2.5 font-semibold text-white'

export default async function PhotoAdmin({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const signedIn = validSession((await cookies()).get(sessionCookie)?.value)
  const loginError = (await searchParams).erro === 'login'
  const { sources, captions } = signedIn ? await readPhotos() : { sources: {}, captions: {} }
  const groups = [...new Set(photoIds.map(id => photoSlots[id].group))]

  return (
    <main className="min-h-screen bg-parch-100 px-4 py-8 font-dm text-ink sm:px-8 sm:py-14">
      <div className={signedIn ? 'mx-auto max-w-5xl' : 'mx-auto max-w-md'}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="inline-flex min-h-11 items-center underline underline-offset-4">Ver site</a>
          {signedIn && <form action={logout}><button className={button}>Terminar sessão</button></form>}
        </div>
        <h1 className="mb-5 font-cormorant text-5xl font-semibold">Gestão de fotos</h1>
        {signedIn ? (
          <div className="space-y-10">
            {process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN && (
              <p role="status" className="rounded-xl border border-parch-300 bg-white p-4">
                É preciso ligar o armazenamento de fotos na Vercel para poder guardar alterações.
              </p>
            )}
            {groups.map(group => (
              <section key={group}>
                <h2 className="mb-4 font-cormorant text-3xl font-semibold">{group}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {photoIds.filter(id => photoSlots[id].group === group).map(id => (
                    <PhotoEditor key={id} id={id} src={sources[id] ?? photoSlots[id].original}
                      caption={isGallerySlot(id) ? currentCaption(id, sources[id], captions[id]) : undefined} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <form action={login} className="grid gap-5 rounded-2xl border border-parch-200 bg-white p-5 shadow-sm sm:p-7">
            {loginError && <p role="alert" className="text-red-800">Utilizador ou palavra-passe incorretos.</p>}
            <label className="grid gap-2 font-medium">
              Utilizador
              <input name="username" autoComplete="username" autoCapitalize="none" required maxLength={80}
                className="min-h-11 rounded-lg border border-stone-300 px-3" />
            </label>
            <label className="grid gap-2 font-medium">
              Palavra-passe
              <input name="password" type="password" autoComplete="current-password" required maxLength={256}
                className="min-h-11 rounded-lg border border-stone-300 px-3" />
            </label>
            <button className={button}>Entrar</button>
          </form>
        )}
      </div>
    </main>
  )
}
