import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newUsername, newPassword } = await request.json();

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await dbConnect();
    
    // There should only be one admin account for now
    const admin = await Admin.findOne({});
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    admin.username = newUsername;
    admin.password = hashedNewPassword;
    await admin.save();

    return NextResponse.json({ success: true, message: "Credentials updated successfully" });
  } catch (error) {
    console.error("Credentials API Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
