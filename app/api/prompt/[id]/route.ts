import Prompt from "@models/prompt";
import { connectDB } from "@utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await connectDB();
    const response = await Prompt.findById(params.id).populate("creater");
    if (!response)
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return NextResponse.json(
        { message: "Prompt does not exist" },
        { status: 404 }
      );
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in updating prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);
    return NextResponse.json({ message: "prompt deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}
