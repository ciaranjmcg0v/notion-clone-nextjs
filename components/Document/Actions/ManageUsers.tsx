"use client";

import { removeUserFromDocument } from "@/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "sonner";
import LoadingSpinner from "../../LoadingSpinner";
import { Button } from "../../ui/button";

function ManageUsers() {
  const { user } = useUser();
  const isOwner = useOwner();
  const room = useRoom();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User removed from room successfully");
      } else {
        toast.error("Failed to remove user from room");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div>
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex items-center justify-between mb-2"
            >
              <p className="font-mono">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You (${doc.data().userId})`
                  : doc.data().userId}
              </p>

              <div className="flex items-center gap-2">
                <p
                  className={`border ${
                    doc.data().role === "owner"
                      ? "text-indigo-600 border-indigo-600"
                      : "text-gray-400 border-gray-400"
                  } p-1 rounded-lg`}
                >
                  {doc.data().role}
                </p>

                {isOwner &&
                doc.data().userId !== user?.emailAddresses[0].toString() ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(doc.data().userId)}
                    disabled={isPending}
                    size="sm"
                  >
                    {isPending ? (
                      <LoadingSpinner width={5} height={5} embedded={false} />
                    ) : (
                      <Trash2Icon />
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast.error(
                        "You can't remove yourself from this document. Please delete the document instead."
                      )
                    }
                    size="sm"
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ManageUsers;
