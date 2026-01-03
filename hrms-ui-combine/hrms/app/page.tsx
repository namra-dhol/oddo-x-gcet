export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
        Welcome to Dayflow
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        Manage your workforce, track attendance, and handle time-off requests seamlessly.
      </p>

      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
