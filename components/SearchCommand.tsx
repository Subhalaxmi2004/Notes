"use client"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
  import {useSearch} from "@/hooks/UserSearch"
  import { ElementRef, useRef, useState, useEffect } from "react";
  import { File} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
export const SearchCommand=()=>{
    const {user} = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch)
    const[isMounted,setisMounted]=useState(false);
    const toggle = useSearch((store)=>store.toggle)
    const isOpen = useSearch((store)=>store.isOpen)
    const onClose = useSearch((store)=>store.onClose)
    useEffect(()=>{
        setisMounted(true);
    },[])
    useEffect(()=>{
        const down = (e:KeyboardEvent)=>{
            if(e.key==="k" && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                toggle();
            }
        }
        document.addEventListener("keydown",down)
        return () =>document.removeEventListener("keydown",down)
    },[toggle])
    const onSelect=(id:string)=>{
        router.push(`/documents/${id}`);
        onClose();
    }
    if(!isMounted){
        return null;
    }
    return(
        <>
        <Command open={isOpen} onOpenChange={onClose}>
  <CommandInput placeholder={`Search ${user?.fullName}'s Jotion`} />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="documents">
        {documents?.map((document)=>(
             <CommandItem key={document._id} value={`${document._id}-${document.title}`} 
             title={document.title} onSelect={onSelect}>
                {
                    document.icon?(
                        <p className="mr-2 text-[18px]">{document.icon}</p>
                    ):(<File className="mr-2 h-4 w-4"/>)
                }
                <span>

                </span>
             </CommandItem>
        ))}
     
      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
</>
    )

}