// app/api/translateDocument/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY!,
});

type TranslateDocumentRequest = {
  documentData: string;
  language: string;
};

type TranslateDocumentResponse = {
  translation: string;
};

export async function POST(req: NextRequest) {
  try {
    const { documentData, language }: TranslateDocumentRequest =
      await req.json();

    // Ensure documentData is a string
    if (typeof documentData !== "string" || !documentData) {
      return NextResponse.json(
        { error: "Invalid documentData" },
        { status: 400 }
      );
    }

    // Summarize the document
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Summarize this document into around 60 words. Be specific but make it easy to understand.",
        },
        {
          role: "user",
          content: documentData,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    const summary = summaryResponse.choices[0]?.message?.content || "";

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to summarize the document" },
        { status: 500 }
      );
    }

    // Translate the summary
    const translationResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You will be provided with text in English, and your task is to translate it into ${language}.`,
        },
        {
          role: "user",
          content: summary,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    const translation = translationResponse.choices[0]?.message?.content || "";

    if (!translation) {
      return NextResponse.json(
        { error: "Failed to translate the summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({ translation } as TranslateDocumentResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
