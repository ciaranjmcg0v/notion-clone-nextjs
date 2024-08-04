import { useState, useTransition } from 'react';

interface UseTranslateDocument {
  translateDocument: (documentData: string, targetLang: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  translation: string | null;
}

const useTranslateDocument = (): UseTranslateDocument => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const translateDocument = async (documentData: string, targetLang: string) => {
    setLoading(true);
    setError(null);
    setTranslation(null);

    try {
      const response = await fetch('/translateDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentData, targetLang }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTranslation(result.translation);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { translateDocument, loading, error, translation };
};

export default useTranslateDocument;
