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
      title: `Convert ${from.toUpperCase()} to ${to.toUpperCase()} | Image Converter`,
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

export default function ConverterPage({ params }: ConverterPageProps) {
  const { from, to } = params;

  // Validate the formats. If they are not supported, show a 404 page.
  if (!supportedFormats.includes(from) || !supportedFormats.includes(to)) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <ConverterForm fromFormat={from} toFormat={to} />
    </main>
  );
}
