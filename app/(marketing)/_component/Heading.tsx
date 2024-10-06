import React from 'react';
import { Button } from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import {useConvexAuth} from "convex/react"
import {Spinner} from "@/components/Spinner"
import Link from 'next/link'
import { SignInButton ,UserButton} from '@clerk/nextjs'

const Heading = () => {
  const {isAuthenticated,isLoading} = useConvexAuth();

  return (
    <>
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl md:text-5xl sm:text-6xl font-bold">
        Your Ideas, Plans, Documents Unified. Welcome to <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base md:text-xl sm:text-2xl font-medium">jotion is a better workspace <br/> where better,faster work happens.</h3>
      {!isAuthenticated && !isLoading &&(
      <Button>
        <Link href="/documwnts">Enter Jotion</Link>
      <ArrowRight className="h-4 w-4 ml-2"/>
     </Button>
      )}
      {isLoading && (<div className="w-full justify-center items-center">
        <Spinner size="lg"/>
      </div>)}
      {!isAuthenticated && !isLoading &&(
            <>
               
                <SignInButton mode="modal"> 
                  <Button  size="sm">Get Jotion Free
                  <ArrowRight className="h-4 w-4 ml-2"/>
                  </Button>
                </SignInButton>
            </>
          )}
       
    </div>
    </>
  );
};

export default Heading;





