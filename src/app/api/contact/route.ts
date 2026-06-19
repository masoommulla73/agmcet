import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We pull the access key from the SERVER environment variable.
    // Because it doesn't start with NEXT_PUBLIC_, it is completely hidden from the browser.
    const accessKey = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        { message: "Server configuration error: missing access key." },
        { status: 500 }
      );
    }

    // Proxy the request to Web3Forms
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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to submit to Web3Forms." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
