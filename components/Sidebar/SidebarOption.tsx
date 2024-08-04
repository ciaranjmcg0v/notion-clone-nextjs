"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center p-2 border-b ${
        isActive && "bg-gray-300 font-bold border border-indigo-600 rounded-lg"
      }`}
    >
      <FileText
        className={`md:hidden space-x-2 h-6 w-6 ${
          isActive ? "text-indigo-600" : "text-gray-500"
        } mr-2`}
      />
      <p
        className={`truncate ${isActive ? "text-indigo-600" : "text-gray-500"}`}
      >
        {data.title}
      </p>
    </Link>
  );
}
export default SidebarOption;
