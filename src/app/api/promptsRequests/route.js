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

    console.log("!userId || !promptId || !action" , userId , promptId , action )

    if (!userId || !promptId || !action) {
      return NextResponse.json({
        success: false,
        message: "Please provide proper data",
      }, { status: 400 });
    }

    if (action === "get") {


      const res = await UserPrompt.findOne({ _id: promptId, userId });
      if (!res) {
        return NextResponse.json({
          success: false,
          message: "Data not found",
        }, { status: 400 });
      }

      const response = {
        _id : res._id ,
        prompt : res.prompt ,
        answer : res.answer,
        model : res.model,
        createdAt : res.createdAt ,
        __v : res.__v,
        isHistory : true,
      }



      return NextResponse.json({ success: true, response }, { status: 200 });




    } else if (action === "del") {
      await UserPrompt.findOneAndDelete({ _id: promptId, userId });

      return NextResponse.json({ success: true , del : true , promptId : promptId }, { status: 200 });


    } else {
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
