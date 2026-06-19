import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Reads exactly: WEB3FORMS_KEY from Vercel environment variables
    const accessKey = (process.env.WEB3FORMS_KEY || "").replace(/['"]/g, "").trim();

    if (!accessKey) {
      return NextResponse.json(
        { message: "Server error: WEB3FORMS_KEY is not set in Vercel environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...body,
      }),
    });

    let data: { success?: boolean; message?: string } = {};
    try {
      data = await response.json();
    } catch {
      return NextResponse.json({ success: true, message: "Form submitted successfully." });
    }

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { message: data.message || `Web3Forms error (Status: ${response.status}).` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
