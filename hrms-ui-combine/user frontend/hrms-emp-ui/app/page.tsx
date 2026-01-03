"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'admin' | 'employee'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[var(--card-bg)] rounded-[var(--radius)] border border-[var(--border)] shadow-[var(--shadow-md)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Dayflow HRMS</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="admin"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="flex h-10 w-full rounded-[var(--radius)] border border-[var(--input-border)] bg-transparent px-3 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div className="flex items-center space-x-6 pb-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value as "admin")}
                className="w-4 h-4 accent-[var(--primary)]"
              />
              <span className="text-sm font-medium">Admin</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value as "employee")}
                className="w-4 h-4 accent-[var(--primary)]"
              />
              <span className="text-sm font-medium">Employee</span>
            </label>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] h-10 px-4 py-2 w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-xs text-[var(--muted)]">
          <p>Don't have an account? Contact your administrator.</p>
        </div>
      </div>
    </div>
  );
}

