import { NextResponse } from "next/server";
import sharp from "sharp";

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

    // Get the quality value from the form data, defaulting to 80 if not provided
    const quality = formData.get("quality")
      ? parseInt(formData.get("quality") as string, 10)
      : 80;

    if (!file || !fromFormat || !toFormat) {
      return NextResponse.json(
        { error: "Missing file or format data" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let sharpInstance = sharp(buffer);

    // Apply quality settings based on the target format
    switch (toFormat.toLowerCase()) {
      case "jpeg":
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case "png":
        // PNG uses a compression level from 0-9, so we scale the quality percentage to this range
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
        // Sharp does not have a quality option for GIF, so we use toFormat
        sharpInstance = sharpInstance.toFormat("gif");
        break;
      default:
        sharpInstance = sharpInstance.toFormat(
          toFormat as unknown as keyof sharp.FormatEnum
        );
        break;
    }

    const convertedBuffer = await sharpInstance.toBuffer();

    const headers = new Headers();
    headers.set("Content-Type", `image/${toFormat}`);
    headers.set(
      "Content-Disposition",
      `attachment; filename="converted-image.${toFormat}"`
    );

    return new NextResponse(new Uint8Array(convertedBuffer), { headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
