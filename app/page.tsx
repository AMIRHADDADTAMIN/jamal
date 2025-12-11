```tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <section className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between py-6">
          <h1 className="text-3xl font-semibold">Automat Super-App</h1>
          <nav className="space-x-4">
            <Link href="/rent">Rent</Link>
            <Link href="/services">Services</Link>
            <Link href="/ev">EV</Link>
            <Link href="/towtruck">Tow</Link>
          </nav>
        </header>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Next-gen Web3 Automotive Marketplace + Services
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Discover, rent, service, and manage vehicles — powered by AI pricing, Web3 escrow, and real-time service orchestration.
            </p>

            <div className="mt-6 flex gap-4">
              <Link href="/rent" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Rent a car</Link>
              <Link href="/services" className="px-4 py-2 border rounded-lg">Book service</Link>
            </div>

            <div className="mt-6">
              <form className="flex gap-2">
                <input aria-label="search" placeholder="Search brand, model, city..." className="flex-1 p-3 rounded-lg border bg-white/80 dark:bg-slate-800/60" />
                <button className="px-4 py-3 bg-green-600 text-white rounded-lg">Search</button>
              </form>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image src="/hero-car.jpg" alt="Car hero" width={900} height={600} className="object-cover" priority />
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold">Featured Cars</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Tesla Model 3","Ford Mustang","BMW i4"].map((c, idx) => (
              <article key={idx} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-md mb-3 flex items-center justify-center">
                  <span className="text-slate-400">{c} — image</span>
                </div>
                <h4 className="font-medium">{c}</h4>
                <p className="text-sm text-slate-500">AI Price: $ {Math.floor(20000 + Math.random()*40000)}</p>
                <div className="mt-3 flex gap-2">
                  <Link href="/rent" className="px-3 py-1 bg-blue-600 text-white rounded">Rent</Link>
                  <Link href="/cars/create" className="px-3 py-1 border rounded">Details</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {title: "Rent", desc: "Short & long term rentals"},
            {title: "Tow Truck", desc: "Emergency assistance"},
            {title: "EV Charging", desc: "Mobile or station"}
          ].map((a, i) => (
            <div key={i} className="p-6 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
              <h4 className="font-semibold">{a.title}</h4>
              <p className="mt-2 text-sm text-slate-500">{a.desc}</p>
              <div className="mt-4">
                <Link href={`/${a.title.toLowerCase().replace(" ","")}`} className="text-blue-600">Get started →</Link>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-16 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Automat — Built with Next.js, Web3 & AI
        </footer>
      </section>
    </main>
  );
}
```