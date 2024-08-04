"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import * as Y from "yjs";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
  // Add more languages here as needed.
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");
  const [question, setQuestion] = useState(
    `Summarize this document and translate it to ${
      language ? language : "the chosen language"
    }`
  );
  const [isPending, startTransition] = useTransition();
  const [translation, setTranslation] = useState<string | null>(null);

  const formattedLanguage = (
    <span className="font-bold text-sm text-indigo-600">
      {`translated to ${language}`}
    </span>
  );

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      if (documentData && language) {
        console.log("document and language", documentData, language);
        setTranslation(null);

        try {
          const response = await fetch("/translateDocument", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ documentData, language }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          setTranslation(result.translation);
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a summary of the document in
            the selected language
          </DialogDescription>
        </DialogHeader>

        {translation && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex flex-col">
              {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
              <hr className="my-5" />
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center bg-gray-400 rounded-lg p-2">
                  <BotIcon className="w-8" />
                  <p className="flex items-center font-bold mr-2">AI says:</p>
                </div>
                <div>{isPending ? "Translating..." : formattedLanguage}</div>
              </div>
            </div>
            <div>
              {isPending ? "Thinking.." : <Markdown>{translation}</Markdown>}
            </div>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>

            <SelectContent>
              {languages.map((language) => (
                <SelectItem
                  key={language}
                  value={language}
                  className="cursor-pointer"
                >
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default TranslateDocument;
