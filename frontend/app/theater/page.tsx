import Head from "next/head";
import Image from "next/image";

export default function TheaterDashboard() {
  return (
    <>
      <Head>
        <title>Theater Admin Dashboard</title>
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </Head>

      <div className="bg-zinc-900 text-white flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-800 flex flex-col p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">Theater</h1>
              <p className="text-sm text-zinc-400">Admin Panel</p>
            </div>
          </div>
          <nav className="space-y-3">
            <a href="#content" className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
              <i className="ph ph-film-strip text-yellow-400" /> Content
            </a>
            <a href="#host" className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
              <i className="ph ph-broadcast text-yellow-400" /> Host Livestreams
            </a>
            <a href="#upload" className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
              <i className="ph ph-upload-simple text-yellow-400" /> Upload Performances
            </a>
            <a href="#analytics" className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
              <i className="ph ph-chart-bar text-yellow-400" /> Analytics
            </a>
            <a href="#customization" className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
              <i className="ph ph-gear text-yellow-400" /> Customization
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16 overflow-y-auto">
          {/* Content */}
          <section id="content" className="space-y-8">
            <h2 className="text-2xl font-semibold">Content</h2>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Livestreams</h3>
              <ul className="space-y-4">
                <li className="bg-zinc-700 p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">Khmer Drama Show</p>
                    <p className="text-sm text-zinc-400">Date: July 25, 2025 · 8:00 PM</p>
                  </div>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold">$4.00</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Performances</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-700 p-4 rounded">
                  <video className="w-full rounded mb-2" controls poster="/images/performance1.jpg">
                    <source src="/media/videos/performance1.mp4" type="video/mp4" />
                  </video>
                  <p className="font-medium">Apsara Spirit</p>
                  <p className="text-sm text-zinc-400">Uploaded: May 2025</p>
                  <p className="bg-yellow-400 text-black px-2 py-1 rounded w-max mt-2 font-semibold">$2.00</p>
                </div>
              </div>
            </div>
          </section>

          {/* Host Livestream */}
          <section id="host" className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Host Livestream</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Performance Title" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <input type="datetime-local" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <input type="number" placeholder="Ticket Price ($)" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition">
                Start Livestream
              </button>
            </form>
          </section>

          {/* Upload Performance */}
          <section id="upload" className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Performance</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Performance Title" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <input type="file" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <input type="number" placeholder="Price ($)" className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none" />
              <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition">
                Upload
              </button>
            </form>
          </section>

          {/* Analytics */}
          <section id="analytics" className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-700 p-4 rounded">
                <p className="text-lg font-semibold">Apsara Spirit</p>
                <p className="text-sm text-zinc-400">Views: 1240</p>
                <p className="text-sm text-zinc-400">Likes: 320</p>
                <p className="text-sm text-zinc-400">Comments: 45</p>
                <p className="text-sm text-zinc-400">Earnings: $248.00</p>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section id="customization" className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Channel Customization</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Profile Picture</label>
                <input type="file" className="w-full p-2 rounded bg-zinc-700 text-white" />
              </div>
              <div>
                <label className="block text-sm mb-1">Banner Image</label>
                <input type="file" className="w-full p-2 rounded bg-zinc-700 text-white" />
              </div>
              <button type="submit" className="bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-300 transition">
                Save Changes
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
