import Link from "next/link";
import supportedFormats from "@/supportedFormats";
import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Image Converter | Convert Images Easily",
    description:
      "A simple and efficient image converter application. Convert images between various formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF.",
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
      title: "Image Converter | Convert Images Easily",
      description:
        "A simple and efficient image converter application. Convert images between various formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF.",
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
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Image Converter</h1>
      <p className="text-gray-400 mb-12 text-center max-w-2xl">
        Select a conversion pair from the list below to get started. Each pair
        has a dedicated page for converting your images.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {formatPairs.map((pair, index) => (
          <Link
            key={index}
            href={`/${pair.from}/${pair.to}`}
            className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold">
              {pair.from.toUpperCase()} to {pair.to.toUpperCase()}
            </h2>
            <p className="text-gray-400 mt-2">
              Convert from .{pair.from} to .{pair.to} format.
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
