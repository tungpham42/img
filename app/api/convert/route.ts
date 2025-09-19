import { NextResponse } from "next/server";
import sharp from "sharp";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // hoặc để domain cụ thể nếu muốn hạn chế
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function withCORS(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function OPTIONS() {
  return withCORS(NextResponse.json({}, { status: 200 }));
}

export async function GET() {
  return withCORS(NextResponse.json({ status: "ok" }));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fromFormat = formData.get("fromFormat") as string;
    const toFormat = formData.get("toFormat") as
      | "jpeg"
      | "png"
      | "webp"
      | "tiff"
      | "gif"
      | "avif";

    const quality = formData.get("quality")
      ? parseInt(formData.get("quality") as string, 10)
      : 80;

    if (!file || !fromFormat || !toFormat) {
      return withCORS(
        NextResponse.json(
          { error: "Missing file or format data" },
          { status: 400 }
        )
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let sharpInstance = sharp(buffer);

    switch (toFormat.toLowerCase()) {
      case "jpeg":
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case "png":
        const compressionLevel = Math.round((quality / 100) * 9);
        sharpInstance = sharpInstance.png({ compressionLevel });
        break;
      case "webp":
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case "tiff":
        sharpInstance = sharpInstance.tiff({ quality });
        break;
      case "avif":
        sharpInstance = sharpInstance.avif({ quality });
        break;
      case "gif":
        sharpInstance = sharpInstance.toFormat("gif");
        break;
      default:
        sharpInstance = sharpInstance.toFormat(
          toFormat as unknown as keyof sharp.FormatEnum
        );
        break;
    }

    const convertedBuffer = await sharpInstance.toBuffer();

    const headers = new Headers({
      ...corsHeaders,
      "Content-Type": `image/${toFormat}`,
      "Content-Disposition": `attachment; filename="converted-image.${toFormat}"`,
    });

    return new NextResponse(new Uint8Array(convertedBuffer), { headers });
  } catch (error) {
    console.error(error);
    return withCORS(
      NextResponse.json({ error: "Conversion failed" }, { status: 500 })
    );
  }
}
