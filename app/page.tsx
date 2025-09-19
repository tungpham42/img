import Link from "next/link";
import supportedFormats from "@/supportedFormats";
import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Image Converter | Transform Images with Ease",
    description:
      "Effortlessly convert images between formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF with our fast and user-friendly tool.",
    keywords: [
      "image converter",
      "convert images",
      "jpeg to png",
      "png to jpeg",
      "webp converter",
      "avif converter",
      "tiff converter",
      "gif converter",
      "image format conversion",
    ],
    openGraph: {
      title: "Image Converter | Transform Images with Ease",
      description:
        "Effortlessly convert images between formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF with our fast and user-friendly tool.",
      type: "website",
      url: hostUrl,
      images: [
        {
          url: `${hostUrl}/1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Image Converter",
        },
      ],
      siteName: "Image Converter",
    },
  };
}

export default function HomePage() {
  const formatPairs = [];
  for (let i = 0; i < supportedFormats.length; i++) {
    for (let j = 0; j < supportedFormats.length; j++) {
      if (supportedFormats[i] !== supportedFormats[j]) {
        formatPairs.push({
          from: supportedFormats[i],
          to: supportedFormats[j],
        });
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-8">
      <h1 className="leading-[1.75] text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
        Image Converter
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-3xl leading-relaxed">
        Transform your images effortlessly! Choose a conversion pair below to
        convert between formats like JPEG, PNG, WebP, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {formatPairs.map((pair, index) => (
          <Link
            key={index}
            href={`/${pair.from}/${pair.to}`}
            className="group relative p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl hover:bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h2 className="text-2xl font-bold text-white">
              {pair.from.toUpperCase()}{" "}
              <span className="text-purple-400">→</span> {pair.to.toUpperCase()}
            </h2>
            <p className="text-gray-300 mt-2 text-sm">
              Convert .{pair.from} to .{pair.to} in a snap!
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
