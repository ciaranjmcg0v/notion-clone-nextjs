"use client";

import { LiveList, LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";
import LiveCursorProvider from "./LiveCursorProvider";
import LoadingSpinner from "../LoadingSpinner";

function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      initialStorage={{
        people: new LiveList([new LiveObject({ name: "John", age: "33" })]),
      }}
    >
      <ClientSideSuspense
        fallback={<LoadingSpinner width={16} height={16} embedded={true} />}
      >
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
}
export default RoomProvider;
