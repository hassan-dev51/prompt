import { connectDB } from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";

export async function POST(req: NextRequest) {
  const { userId, prompt, tag } = await req.json();
  console.log(userId, prompt, tag);

  try {
    await connectDB();
    const creatPrompt = await Prompt.create({
      creater: userId,
      prompt: prompt,
      tag: tag,
    });
    // await creatPrompt.save();

    return NextResponse.json({ creatPrompt }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to create prompt", error },
      { status: 500 }
    );
  }
}
