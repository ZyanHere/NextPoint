'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Breadcrumbs from "./Breadcrumbs";

function Header(){
    const {user} = useUser(); //to ckeck the user login or not

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
            {user?.firstName}
            {`'s`} Space
        </h1>
      )}

      {/* BreadCrumbs */}
      <Breadcrumbs/>
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>

        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

export default Header
