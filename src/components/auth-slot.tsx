import { Link } from "@tanstack/react-router";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <div
        className="h-9 w-24 animate-pulse rounded-full bg-fg/8"
        aria-hidden="true"
      />
    );
  }

  if (user) {
    const label = user.displayName ?? user.primaryEmail ?? "Akun";
    return (
      <div className="flex items-center gap-2">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt=""
            className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-fg/15"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-fg/10 font-display text-xs font-semibold">
            {label.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm text-fg sm:inline">
          {label}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => void signOut()}
        >
          Keluar
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link to="/login">Masuk</Link>
    </Button>
  );
}
