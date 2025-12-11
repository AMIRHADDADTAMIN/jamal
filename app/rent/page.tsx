import Link from "next/link";

export default function RentPage() {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Rent a Car</h1>
          <Link href="/rent/new" className="text-blue-600">List your car</Link>
        </header>

        <section className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded">
              <h3 className="font-medium">Short Term</h3>
              <p className="text-sm text-slate-500">Hourly & daily rentals with instant booking and crypto payment option.</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-medium">Long Term</h3>
              <p className="text-sm text-slate-500">Subscriptions & flexible leasing.</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Available Cars</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2,3,4].map((i)=>(
              <article key={i} className="p-4 border rounded hover:shadow transition">
                <div className="h-36 bg-gray-100 dark:bg-slate-800 rounded mb-3"/>
                <h4 className="font-medium">Car #{i}</h4>
                <p className="text-sm text-slate-500">Details & pricing</p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">Book</button>
                  <button className="px-3 py-1 border rounded">Details</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}