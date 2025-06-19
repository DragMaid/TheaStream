"use client"
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();

  const handleBooking = (e) => {
    e.preventDefault();
    router.push("/audience/purchased");
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-0 rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden">
        
        {/* Image Section */}
        <div className="relative h-80 md:h-auto">
          <img
            src="/apsara-rising.jpg"
            alt="Cambodian traditional dance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Details Section */}
        <div className="bg-zinc-900 p-8 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              The Spirit of Apsara
            </h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              Experience the serene elegance of Cambodian classical dance—
              “The Spirit of Apsara” brings ancient myths to life through
              mesmerizing movements and elaborate costumes.
            </p>

            <div className="text-sm space-y-2">
              <p>
                📅 <span className="text-white font-medium">Date:</span> July 10, 2025
              </p>
              <p>
                🕖 <span className="text-white font-medium">Time:</span> 7:00 PM (UTC+8)
              </p>
              <p>
                💰 <span className="text-white font-medium">Ticket:</span> $9.99
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <form onSubmit={handleBooking}>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
              >
                Pay & Reserve Seat
              </button>
            </form>

            <button
              onClick={() => router.push("/audience/explore")}
              className="text-sm text-zinc-400 hover:text-yellow-300 transition w-full text-center"
            >
              ← Back to Upcoming Performances
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
