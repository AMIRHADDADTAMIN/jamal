export default function ServicesPage() {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold">Book Service Center</h1>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 border rounded">
            <h3 className="font-medium">Mobile Carwash</h3>
            <p className="text-sm text-slate-500">Book an on-site carwash in minutes.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Mobile Oil Change</h3>
            <p className="text-sm text-slate-500">We come to you with parts and service.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Diagnostics</h3>
            <p className="text-sm text-slate-500">EV & ICE diagnostics with tele-diagnostics.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Tuning & Modifications</h3>
            <p className="text-sm text-slate-500">Find certified tuning shops and manage jobs.</p>
          </div>
        </section>
      </div>
    </main>
  );
}