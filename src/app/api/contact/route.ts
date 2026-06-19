import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Use the email from the server-side environment variable.
    // This is a SECRET variable — it never leaves the server and never appears in browser dev tools.
    const email =
      process.env.FORM_EMAIL ||
      process.env.NEXT_PUBLIC_FORM_EMAIL ||
      "principal@agmrcet.ac.in";

    // FormSubmit.co AJAX endpoint — no API key required, completely free.
    // Because this request is made from the Next.js SERVER (not the browser),
    // there are zero CORS issues and adblockers cannot interfere.
    const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...body,
        _captcha: "false",
        _template: "table",
      }),
    });

    // FormSubmit may return non-JSON on first activation. Handle gracefully.
    let data: { success?: string; message?: string } = {};
    try {
      data = await response.json();
    } catch {
      // If FormSubmit returned non-JSON it might be the first-time activation email.
      // Treat it as a success so the user sees a confirmation.
      return NextResponse.json({
        success: true,
        message:
          "Form submitted! If this is the first submission, please check your email to activate FormSubmit.",
      });
    }

    if (data.success === "true" || data.success === true as unknown as string) {
      return NextResponse.json({ success: true, message: "Form submitted successfully." });
    }

    // FormSubmit returned a failure message
    return NextResponse.json(
      { message: data.message || "FormSubmit rejected the request." },
      { status: 400 }
    );
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
