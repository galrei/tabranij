import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { CrystalMark } from "@/components/crystal-mark";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <CrystalMark className="size-8 text-primary" />
          <span className="font-display text-xl font-semibold tracking-[0.22em]">
            TABRANIJ
          </span>
        </Link>
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-fg">
            Masuk
          </h1>
          <p className="mt-2 text-sm text-muted">
            Simpan sesi lab kristal harga Anda.
          </p>
          <div className="mt-6 space-y-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                >
                  {p.providerId.includes("google") ? <GoogleIcon /> : <XIcon />}
                  Lanjut dengan {p.label}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted">Masuk dinonaktifkan.</p>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="hover:text-fg">
            Kembali ke lab
          </Link>
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.74-.06-1.28-.2-1.84H12v3.34h5.5c-.11.9-.71 2.26-2.05 3.18l-.02.1 2.98 2.26.2.02c1.9-1.75 3-4.33 3-7.06z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.96-.89 6.61-2.42l-3.15-2.4c-.85.59-1.98 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15l-.1.01-3.08 2.33-.04.09C5.73 19.98 8.64 22 12 22z"
      />
      <path
        fill="currentColor"
        d="M6.32 13.03A6.03 6.03 0 0 1 6 12c0-.36.04-.71.1-1.03v-.11L3.18 8.5l-.09.04A9.98 9.98 0 0 0 2 12c0 1.61.39 3.13 1.09 4.46l3.23-2.43z"
      />
      <path
        fill="currentColor"
        d="M12 5.82c1.88 0 3.15.81 3.87 1.49l2.83-2.7C16.95 2.95 14.7 2 12 2 8.64 2 5.73 4.02 4.09 7.54L7.32 9.97C8.12 7.56 10.36 5.82 12 5.82z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.77L23.2 22h-6.5l-5.1-6.66L6 22H2.9l7.27-8.31L.96 2h6.66l4.6 6.09L18.9 2Zm-1.14 18.1h1.8L6.35 3.8H4.4l13.36 16.3Z"
      />
    </svg>
  );
}
