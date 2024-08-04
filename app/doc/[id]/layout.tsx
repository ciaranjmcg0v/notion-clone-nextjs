import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RealTime/RoomProvider";

function DocLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  auth().protect();
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
export default DocLayout;
