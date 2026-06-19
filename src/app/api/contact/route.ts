import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail   = process.env.FORM_EMAIL || process.env.NEXT_PUBLIC_FORM_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { message: "Server error: Gmail credentials are not configured in Vercel environment variables." },
        { status: 500 }
      );
    }

    // Build a readable HTML email from the form fields
    const rows = Object.entries(body)
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, val]) => `<tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #ddd;text-transform:capitalize">${key}</td><td style="padding:8px 12px;border:1px solid #ddd">${val}</td></tr>`)
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2 style="background:#0a192f;color:#d4af37;padding:16px;margin:0">
          ${body.subject || "New Form Submission"} — AGM College
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:12px">
          ${rows}
        </table>
        <p style="color:#888;font-size:12px;margin-top:16px">
          Sent automatically from agmcet.vercel.app
        </p>
      </div>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"AGM College Website" <${gmailUser}>`,
      to: toEmail,
      subject: body.subject || "New Form Submission – AGM College",
      html,
    });

    return NextResponse.json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { message: `Mail error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
