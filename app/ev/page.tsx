export default function EVPage() {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold">EV Services & Tesla Diagnostics</h1>
        <p className="mt-2 text-sm text-slate-500">Battery health checks, on-demand charging, Tesla-specific tools and advice.</p>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 border rounded">
            <h3 className="font-medium">EV Charging</h3>
            <p className="text-sm text-slate-500">Request mobile charging or find nearby stations.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-medium">Tesla Diagnostics</h3>
            <p className="text-sm text-slate-500">Tesla-specific diagnostic and service workflows.</p>
          </div>
        </section>
      </div>
    </main>
  );
}