import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Avatars from "../Avatars";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DeleteDocument from "./Actions/DeleteDocument";
import InviteUser from "./Actions/inviteUser";
import ManageUsers from "./Actions/ManageUsers";
import Editor from "./Editor";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState<string>("");
  const [isUpdating, startTranstition] = useTransition();
  const isOwner = useOwner();
  console.log("OPEN_AI_KEY", process.env.OPEN_AI_KEY);

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTranstition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/* update title */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* IF */}
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
          {/* isOwner && inviteUser, DeleteDocument */}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/* ManageUsers */}
        <ManageUsers />

        {/* Avatars */}
        <Avatars />
      </div>

      {/* Collaborative Editor */}
      <Editor />
    </div>
  );
}
export default Document;
