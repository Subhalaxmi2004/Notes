"use client"
import Logo from "./Logo"
import { Button } from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {Spinner} from "@/components/Spinner"
import UseScrollTop from "@/hooks/UseScrollTop"
import {ModeToggle} from "@/components/ModeToggle"
import { SignInButton ,UserButton} from '@clerk/nextjs'
import {useConvexAuth} from "convex/react"
import Link from 'next/link'
const Navbar = () => {
    const scrolled = UseScrollTop()
    const {isAuthenticated,isLoading} = useConvexAuth();
  return (
    <>
    <div className={cn("z-50 bg-background fixed top-0 dark:bg-[#1f1f1f] flex items-center w-full p-6",scrolled && "border-b shadow-sm")}>
        <Logo/>
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          {isLoading &&(<Spinner/>)}
          {!isAuthenticated && !isLoading &&(
            <>
                <SignInButton mode="modal"> 
                  <Button variant="ghost" size="sm">Log In</Button>
                </SignInButton>
                <SignInButton mode="modal"> 
                  <Button  size="sm">Get Jotion Free</Button>
                </SignInButton>
            </>
          )}
          {
            isAuthenticated && !isLoading &&(
              <>
              <Button variant="ghost" size="sm">
                <Link href="/documents">
                Enter Jotion</Link>
              </Button>
              <UserButton afterSignOutUrl="/"/>
              </>
            )
          }
            <ModeToggle/>
        </div>
    </div>
    </>
  )
}

export default Navbar
