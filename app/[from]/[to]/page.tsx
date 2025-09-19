import { ConverterForm } from "@/components/ConverterForm";
import { notFound } from "next/navigation";
import supportedFormats from "@/supportedFormats";
import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";

interface ConverterPageProps {
  params: {
    from: string;
    to: string;
  };
}

export async function generateMetadata({
  params,
}: ConverterPageProps): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  const { from, to } = params;
  return {
    title: `Convert ${from.toUpperCase()} to ${to.toUpperCase()} | Image Converter`,
    description:
      "Quickly convert your images between formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF with our intuitive tool.",
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
      title: `Convert ${from.toUpperCase()} to ${to.toUpperCase()} | Image Converter`,
      description:
        "Quickly convert your images between formats like JPEG, PNG, WebP, AVIF, TIFF, and GIF with our intuitive tool.",
      type: "website",
      url: `${hostUrl}/${from}/${to}`,
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

export default function ConverterPage({ params }: ConverterPageProps) {
  const { from, to } = params;

  // Validate the formats. If they are not supported, show a 404 page.
  if (!supportedFormats.includes(from) || !supportedFormats.includes(to)) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
      <div className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
          Convert <span className="text-purple-400">{from.toUpperCase()}</span>{" "}
          to <span className="text-blue-400">{to.toUpperCase()}</span>
        </h1>
        <ConverterForm fromFormat={from} toFormat={to} />
      </div>
    </main>
  );
}
