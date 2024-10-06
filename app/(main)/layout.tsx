"use client";

import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import React from "react";
import {SearchCommand} from "@/components/SearchCommand"
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
    return null; // Return null after redirect to avoid rendering
  }

  return (
    <>
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand/>
        <div> {children}</div>
       </main>
    </div>
    </>
  );
};

export default MainLayout;
