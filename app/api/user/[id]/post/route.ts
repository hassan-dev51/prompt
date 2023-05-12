import Prompt from "@models/prompt";
import { connectDB } from "@utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await connectDB();
    const response = await Prompt.find({ creater: params.id }).populate(
      "creater"
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to fetch post" },
      { status: 500 }
    );
  }
}
