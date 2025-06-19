import Head from "next/head";

export default function PurchasedPage() {
  return (
    <>
      <Head>
        <title>Purchased Performances</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </Head>

      <div className="bg-zinc-900 text-white min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">My Purchased Performances</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Ticket Card */}
          <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {/* Placeholder for livestream image */}
            <div className="h-40 bg-zinc-700 flex items-center justify-center">
              <img
                src="/apsara-spirit.webp"
                alt="Apsara Spirit"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="space-y-1 mb-4">
                <h2 className="text-xl font-semibold">Apsara Spirit</h2>
                <p className="text-sm text-zinc-400">Purchased: May 26, 2025</p>
                <p className="text-sm text-zinc-400">Show Date: June 2, 2025 · 7:00 PM</p>
                <p className="text-xs text-zinc-500 mt-1">Paid: $2.00</p>
              </div>
              <a
                href="/media/videos/performance1.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-yellow-400 text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-300 transition"
              >
                🎬 Watch Now
              </a>
            </div>
          </div>

          {/* Another Ticket Card */}
          <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {/* Placeholder for livestream image */}
            <div className="h-40 bg-zinc-700 flex items-center justify-center">
              <img
                src="/classic-nigt.webp"
                alt="Khmer Classical Night"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="space-y-1 mb-4">
                <h2 className="text-xl font-semibold">Khmer Classical Night</h2>
                <p className="text-sm text-zinc-400">Purchased: May 30, 2025</p>
                <p className="text-sm text-zinc-400">Show Date: July 10, 2025 · 8:00 PM</p>
                <p className="text-xs text-zinc-500 mt-1">Paid: $3.50</p>
              </div>
              <a
                href="/media/videos/performance2.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-yellow-400 text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-300 transition"
              >
                🎬 Watch Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}