export default function TowTruckPage() {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Tow-Truck Booking</h1>
        <p className="mt-3 text-sm text-slate-500">Request emergency towing with real-time tracking and ETAs.</p>

        <div className="mt-6 p-4 border rounded">
          <form>
            <label className="block text-sm">Location</label>
            <input className="w-full p-2 border rounded mt-1" placeholder="Pick-up address or drop pin" />
            <label className="block text-sm mt-3">Problem</label>
            <textarea className="w-full p-2 border rounded mt-1" />
            <div className="mt-4">
              <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded">Request Tow</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}