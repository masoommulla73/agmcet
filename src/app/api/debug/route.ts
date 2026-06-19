import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = (process.env.WEB3FORMS_KEY || "").trim();

  if (!accessKey) {
    return NextResponse.json({ error: "WEB3FORMS_KEY is empty in Vercel!" });
  }

  // Test submission to Web3Forms
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://agmcet.vercel.app",
      Referer: "https://agmcet.vercel.app",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: "Test",
      email: "test@test.com",
      message: "Debug test from API route",
      subject: "Debug Test",
    }),
  });

  const data = await res.json().catch(() => ({ raw: "non-json response" }));

  return NextResponse.json({
    key_first4: accessKey.substring(0, 4),
    key_last4: accessKey.substring(accessKey.length - 4),
    key_length: accessKey.length,
    status: res.status,
    response: data,
  });
}
