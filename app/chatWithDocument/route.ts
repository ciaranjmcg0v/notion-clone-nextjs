import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY!,
});

type ChatWithDocumentRequest = {
  documentData: string;
  input: string;
};

type ChatWithDocumentResponse = {
  answer: string;
};

export async function POST(req: NextRequest) {
  try {
    const { documentData, input }: ChatWithDocumentRequest =
      await req.json();

    // Ensure documentData and input are strings
    if (
      typeof documentData !== "string" ||
      !documentData ||
      typeof input !== "string" ||
      !input
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Generate a response based on the document and the input
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant knowledgeable about the following document: "${documentData}". Answer the questions based on the content of the document.`,
        },
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
    });

    const answer = chatResponse.choices[0]?.message?.content || "";

    if (!answer) {
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer } as ChatWithDocumentResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
