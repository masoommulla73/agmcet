import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    await dbConnect();

    let admin = await Admin.findOne({});

    if (!admin) {
      // First time login - check against .env
      const envUsername = process.env.ADMIN_USERNAME;
      const envPassword = process.env.ADMIN_PASSWORD;

      if (!envUsername || !envPassword) {
        return NextResponse.json(
          { message: "Server configuration error: Admin credentials not set in environment." }, 
          { status: 500 }
        );
      }

      if (username !== envUsername || password !== envPassword) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      // Create initial admin document
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(envPassword, salt);

      admin = new Admin({
        username: envUsername,
        password: hashedPassword,
      });

      await admin.save();
    } else {
      // Admin exists, verify password
      if (admin.username !== username) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
    }

    // Since we are using sessionStorage on the frontend for simple tab-specific security
    // We will just return a success token. In a real app, this should be a JWT.
    const token = Buffer.from(`${admin.username}:${Date.now()}`).toString('base64');

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ message: `Server error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
