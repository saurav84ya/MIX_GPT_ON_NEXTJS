import User from "@/database/model/User";
import UserPrompt from "@/database/model/UserPrompt";
import { connectDB } from "@/lib/database/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');

    if (!userId || !action) {
      return NextResponse.json({
        success: false,
        message: 'Missing fields'
      }, { status: 400 });
    }

    if (action === 'account') {
      await User.findOneAndDelete({ _id: userId });
      await UserPrompt.deleteMany({ userId });

      return NextResponse.json({
        success: true,
        message: 'Account has been deleted'
      });
    } 
    
    if (action === 'prompts') {
      await UserPrompt.deleteMany({ userId });

      return NextResponse.json({
        success: true,
        message: 'All prompts have been deleted'
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: "Invalid action" 
    }, { status: 400 });

  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
