import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Submission from "@/models/Submission";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await dbConnect();

    const submission = new Submission({
      type: 'admission',
      name: body.name,
      email: body.email,
      phone: body.phone,
      course: body.course,
      city: body.city,
    });

    await submission.save();

    return NextResponse.json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("API Admissions Error:", error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
