import UserPrompt from "@/database/model/UserPrompt";
import { connectDB } from "@/lib/database/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId required" },
        { status: 400 }
      );
    }

    const prompts = await UserPrompt.find({ userId })
      .sort({ createdAt: -1 })
      .select("prompt createdAt")
      .lean();

    const formatted = prompts.map((item) => ({
      _id: item._id,
      prompt: item.prompt.slice(0, 30), // 20-30 characters
      createdAt: item.createdAt,
    }));

    return NextResponse.json(
      { success: true, prompts: formatted },
      { status: 200 }
    );

  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
