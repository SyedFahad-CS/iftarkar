export default function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-5 text-center text-sm text-ink-muted">
      Modified with <span className="text-red-400">♥</span> by{" "}
      <a
        className="font-medium text-ink-secondary transition-colors hover:text-accent"
        href="https://github.com/SyedFahad-CS"
      >
        Syed Fahad
      </a>
      {" | "}
      Original by{" "}
      <a
        className="font-medium text-ink-secondary transition-colors hover:text-accent"
        href="https://haider.id"
      >
        Haider Ali Punjabi
      </a>
    </footer>
  );
}
