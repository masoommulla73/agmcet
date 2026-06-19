import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // WEB3FORMS_KEY — set this in Vercel Environment Variables
    const accessKey = (process.env.WEB3FORMS_KEY || "").trim();

    if (!accessKey) {
      return NextResponse.json(
        { message: "Server error: WEB3FORMS_KEY is not configured." },
        { status: 500 }
      );
    }

    // Exact same structure as your working portfolio project
    const res = await fetch("https://api.web3forms.com/submit", {
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

    if (res.ok) {
      return NextResponse.json({ success: true, message: "Form submitted successfully." });
    } else {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { message: (err as { message?: string }).message || `Web3Forms error (Status: ${res.status})` },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
