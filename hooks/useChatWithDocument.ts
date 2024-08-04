import { useState } from "react";

interface UseChatWithDocument {
  chatWithDocument: (documentData: string, input: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  answer: string | null;
}

const useChatWithDocument = (): UseChatWithDocument => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const chatWithDocument = async (documentData: string, input: string) => {
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch("/chatWithDocument", {
        // Make sure this path is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentData, input }), // Include both documentData and input
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setAnswer(result.answer);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { chatWithDocument, loading, error, answer };
};

export default useChatWithDocument;
