"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  const path = usePathname();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <Link href="/">
          <h1 className="text-2xl">
            {user?.firstName}
            {`'s`} Space
          </h1>
        </Link>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Auth */}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
