import connectDb from "@/lib/db";
import User from "@/models/user_model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

//create Api
//frontend error == 400-499
// backend error==500

// signup
// check exist user
// password check for 6 charector (optional) 
// hash password using bcryptjs
// user create
//http://localhost:3000/api/auth/register

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json(); //Frontend se mil jayega
    await connectDb();
    let existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exist!" }, //status code-200-300 --success 201-create
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "password must be at least 6 charector!" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
        user,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
        { message: `register error ${error}` },
        { status: 500 }
      );
  }
}


