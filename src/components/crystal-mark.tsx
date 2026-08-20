export function CrystalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M16 2.5 L22 9.2 L22 22.8 L16 29.5 L10 22.8 L10 9.2 Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M16 6.2 L19.4 9.8 L19.4 22.2 L16 25.8 L12.6 22.2 L12.6 9.8 Z"
        fill="#05060d"
        opacity="0.55"
      />
    </svg>
  );
}
