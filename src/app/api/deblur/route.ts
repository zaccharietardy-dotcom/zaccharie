import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Upload the file to Replicate first, then pass the URL
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: file.type || "image/png" });

    const fileUrl = await replicate.files.create(blob);

    const output = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: fileUrl,
          scale: 4,
          face_enhance: false,
        },
      }
    );

    // output can be a FileOutput, a URL string, or an array with a URL
    let resultUrl: string;
    if (Array.isArray(output)) {
      resultUrl = String(output[0]);
    } else if (output && typeof output === "object" && "url" in output) {
      resultUrl = (output as { url: () => string }).url();
    } else {
      resultUrl = String(output);
    }

    return NextResponse.json({ resultUrl });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 60;
