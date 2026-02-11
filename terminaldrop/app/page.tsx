import { UploadForm } from '@/components/upload-form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 selection:bg-emerald-500/30 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8 md:gap-12">
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            TerminalDrop
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Drop. Get link. Curl it. Done.
          </p>
        </div>

        <UploadForm />
      </div>

      <footer className="mt-12 md:fixed md:bottom-8 text-xs text-muted-foreground/40 font-mono text-center w-full">
        <p>Built with Next.js, Vercel KV & Blob</p>
      </footer>
    </main>
  )
}
