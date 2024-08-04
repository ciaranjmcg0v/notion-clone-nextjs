import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

const useDocumentTitles = (ids: string[]) => {
  const titles = ids.map((id) => {
    const [data] = useDocumentData(doc(db, "documents", id));
    return { id, title: data?.title ?? id };
  });

  return titles;
};

export default useDocumentTitles;
