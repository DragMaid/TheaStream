"use client"
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { PlayIcon } from "lucide-react";

const featuredShows = [
  {
    title: "Apsara Rising",
    description: "A breathtaking revival of classical Cambodian dance.",
    image: "/apsara-rising.jpg",
    link: "/audience/booking",
  },
  {
    title: "Shadow Spirits",
    description: "Mystical puppetry and folklore come alive on stage.",
    image: "/shadow-spirit.jpg",
    link: "/audience/booking",
  },
  {
    title: "Temple Echoes",
    description: "A theatrical experience set in the Angkor Empire.",
    image: "/temple.jpeg",
    link: "/audience/booking",
  },
];

const allShows = [
  ...featuredShows,
  {
    title: "The Golden Land",
    description: "A tribute to Khmer culture and tradition.",
    image: "/golden-land.jpg",
    link: "/audience/booking",
  },
  {
    title: "Silk Road Dreams",
    description: "A cross-cultural journey of music and storytelling.",
    image: "/silk-road.jpg",
    link: "/audience/booking",
  },
];

export default function PremiersPage() {
  const [search, setSearch] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);

  const filteredShows = allShows.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrev = () =>
    setBannerIndex((prev) => (prev === 0 ? featuredShows.length - 1 : prev - 1));
  const handleNext = () =>
    setBannerIndex((prev) => (prev === featuredShows.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Head>
        <title>Premier Shows</title>
      </Head>

      <div className="bg-zinc-900 text-white min-h-screen">
        {/* Banner Carousel */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={featuredShows[bannerIndex].image}
            alt={featuredShows[bannerIndex].title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute bottom-12 left-12 max-w-lg">
            <h2 className="text-4xl font-bold">{featuredShows[bannerIndex].title}</h2>
            <p className="mt-2 text-zinc-300">{featuredShows[bannerIndex].description}</p>
            <a
              href={featuredShows[bannerIndex].link}
              className="inline-block mt-4 bg-yellow-400 text-black px-5 py-2 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Book Now
            </a>
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-4 bg-zinc-800/60 hover:bg-zinc-700 p-2 rounded-full"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-4 bg-zinc-800/60 hover:bg-zinc-700 p-2 rounded-full"
          >
            ❯
          </button>
        </div>

        {/* Search */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a show..."
              className="w-full p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Grid of Shows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredShows.map((show, idx) => (
              <div key={idx} className="bg-zinc-800 rounded-lg overflow-hidden shadow-md">
                <div className="h-48 relative">
                  <Image
                    src={show.image}
                    alt={show.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{show.title}</h3>
                  <p className="text-sm text-zinc-400">{show.description}</p>
                  <a
                    href={show.link}
                    className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 mt-2 text-sm font-medium"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
