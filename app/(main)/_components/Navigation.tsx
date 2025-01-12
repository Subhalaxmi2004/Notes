"use client";

import { ChevronsLeft, MenuIcon, PlusCircle ,Search,Settings,Trash,Plus} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { ElementRef, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { useQuery, useMutation } from "convex/react"; 
import { api } from "@/convex/_generated/api";
import  Item  from "./Item"; 
import { UserItem } from "./UserItem"; 
import { toast } from "sonner"; 
import {useSearch} from "@/hooks/UserSearch"
import {UserSetting} from "@/hooks/UserSetting"
import {TrashBox} from "./TrashBox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {DocumentList} from "./DocumentList"
const Navigation = () => {
  const search = useSearch()
  const setting = UserSetting()
  const pathname = usePathname();
  const isResizingRef = useRef(false);
  // const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

 
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);


  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 248) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };

 
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };


  const handleCreate = () => {
    const promise = create({ title: "untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999] ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* Collapse button */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-3 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        {/* User and New Page Item */}
        <div>
          <UserItem />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
          <Item onClick={search.onOpen} label="Search" icon={Search} />
          <Item onClick={setting.onOpen} label="Settings" icon={Settings} />
        </div>

        {/* Document List */}
        <div className="mt-4">
         <DocumentList/>
         <Item
         onClick={handleCreate}
         icon={Plus}
         label="Add a Page"
         />

<Popover>
  <PopoverTrigger className="w-full mt-4">
    <Item label="Trash" icon={Trash}/>
  </PopoverTrigger>
  <PopoverContent className="p-0 w-72" side={isMobile?"bottom":"right"}>
    <TrashBox/>
  </PopoverContent>
</Popover>

        </div>

        {/* Resize handler */}
        <div
          onMouseDown={handleMouseDown}
          onClick={() => {}}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        ></div>
      </aside>

      {/* Navbar */}
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
