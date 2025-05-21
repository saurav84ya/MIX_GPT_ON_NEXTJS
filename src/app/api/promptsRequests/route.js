import UserPrompt from "@/database/model/UserPrompt";
import { connectDB } from "@/lib/database/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const promptId = searchParams.get("promptId");
    const userId = searchParams.get("userId");
    const action = searchParams.get("action");

    if (!userId || !promptId || !action) {
      return NextResponse.json({
        success: false,
        message: "Please provide proper data",
      }, { status: 400 });
    }

    if (action === "get") {
      const response = await UserPrompt.findOne({ _id: promptId, userId });
      if (!response) {
        return NextResponse.json({
          success: false,
          message: "Data not found",
        }, { status: 400 });
      }
      return NextResponse.json({ success: true, response }, { status: 200 });
    } else if (action === "del") {
      await UserPrompt.findOneAndDelete({ _id: promptId, userId });
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
