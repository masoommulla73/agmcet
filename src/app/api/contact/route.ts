import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let accessKey = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Remove quotes if the user accidentally pasted them in Vercel
    if (accessKey) {
      accessKey = accessKey.replace(/['"]/g, '').trim();
    }

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE" || accessKey.includes("YOUR_ACCESS_KEY")) {
      // FOOLPROOF FALLBACK: If the Vercel API key is missing or invalid, we will automatically fallback 
      // to using FormSubmit strictly from the backend (which completely bypasses the browser CORS issues).
      const email = process.env.NEXT_PUBLIC_FORM_EMAIL || "yourgmail@gmail.com";
      
      const fsResponse = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!fsResponse.ok) {
        return NextResponse.json({ message: "FormSubmit Fallback failed. Please configure Web3Forms." }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: "Form submitted successfully via Fallback." });
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

    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: `Web3Forms returned an invalid response (Status: ${response.status})` };
    }

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
      { message: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
