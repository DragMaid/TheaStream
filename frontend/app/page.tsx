import Head from "next/head";

export default function RoleSelectionPage() {
  return (
    <>
      <Head>
        <title>Login | Choose Role</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
        {/* Logo at the top center */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="KhmerLive Logo"
            className="w-24 h-24"
          />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to KhmerLive</h1>
          <p className="text-zinc-400">Please choose your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          {/* Theater Option */}
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-yellow-400/20 transition">
            <img
              src="/theater.png"
              alt="Theater"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Theater</h2>
            <p className="text-sm text-zinc-400 text-center mb-4">
              Manage livestreams, upload performances, view analytics, and customize your channel.
            </p>
            <a
              href="/theater"
              className="mt-auto bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Login as Theater
            </a>
          </div>

          {/* Audience Option */}
          <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-yellow-400/20 transition">
            <img
              src="/audience.png"
              alt="Audience"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Audience</h2>
            <p className="text-sm text-zinc-400 text-center mb-4">
              Explore upcoming shows, purchase tickets, and enjoy exclusive cultural performances.
            </p>
            <a
              href="/audience/"
              className="mt-auto bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Login as Audience
            </a>
          </div>
        </div>
      </div>
    </>
  );
}