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

    if (!file || !fromFormat || !toFormat) {
      return NextResponse.json(
        { error: "Missing file or format data" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use sharp to convert the image.
    // The `.toFormat()` method handles the conversion.
    const convertedBuffer = await sharp(buffer).toFormat(toFormat).toBuffer();

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
