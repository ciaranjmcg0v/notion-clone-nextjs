import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <div className="flex items-center justify-center space-x-2 border border-indigo-600 rounded-lg p-1 text-indigo-600">
        <ArrowLeftCircle className="w-5 h-5" />
        <h1 className="font-bold">Get started by creating a new document</h1>
      </div>
    </main>
  );
}
