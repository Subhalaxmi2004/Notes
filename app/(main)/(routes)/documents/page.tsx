"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner"; // Ensure this is imported

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" });
    toast.promise(promise, {
      loading: "Creating a new note..",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };

  return (
    <>
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* <Image src="/images/empty.png" height={300} width={300} alt="empty" className="dark:hidden" />
      <Image src="/images/empty-dark.png" height={300} width={300} alt="empty" className="hidden dark:block" /> */}
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
    </>
  );
};

export default DocumentsPage;
