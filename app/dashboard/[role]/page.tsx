import { use } from "react";
import Link from "next/link";

type Props = { params: { role: string } };

export default function DashboardPage({ params }: Props) {
  const role = params.role?.toUpperCase();

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{role} Dashboard</h1>
          <div className="space-x-3">
            <Link href={`/${role?.toLowerCase()}/inventory`} className="text-blue-600">Inventory</Link>
            <Link href={`/${role?.toLowerCase()}/bookings`} className="text-blue-600">Bookings</Link>
            <Link href={`/${role?.toLowerCase()}/analytics`} className="text-blue-600">AI Analytics</Link>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">
            <h3 className="font-medium">Inventory</h3>
            <p className="text-sm text-slate-500">Manage listings, boosts, and promotions.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Bookings</h3>
            <p className="text-sm text-slate-500">View & manage current bookings and service orders.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Payments & Earnings</h3>
            <p className="text-sm text-slate-500">Crypto payouts, revenue breakdown, fees.</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">AI Analytics (Quick)</h2>
          <div className="mt-4 p-4 border rounded">
            <p className="text-sm text-slate-500">Placeholder for AI-driven pricing, demand heatmaps, and inventory recommendations.</p>
          </div>
        </section>
      </div>
    </main>
  );
}