import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accessKey = (process.env.WEB3FORMS_KEY || "").trim();

    if (!accessKey) {
      return NextResponse.json(
        { message: "Server error: WEB3FORMS_KEY is not configured." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agmcet.vercel.app";

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: siteUrl,
        "User-Agent": "Mozilla/5.0 (compatible; AGMCollegeBot/1.0)",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...body,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && (data as { success?: boolean }).success) {
      return NextResponse.json({ success: true, message: "Form submitted successfully." });
    } else {
      return NextResponse.json(
        { message: (data as { message?: string }).message || `Web3Forms error (Status: ${res.status})` },
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
