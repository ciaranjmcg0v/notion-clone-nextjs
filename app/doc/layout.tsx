import LiveBlocksProvider from "@/components/RealTime/LiveBlocksProvider";

function PageLayout({ children }: { children: React.ReactNode }) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}
export default PageLayout;
