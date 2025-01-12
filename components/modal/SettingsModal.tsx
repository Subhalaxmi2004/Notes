"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import {ModeToggle} from "@/components/ModeToggle"
import { Label } from "@/components/ui/label"
import {UserSetting} from "@/hooks/UserSetting"
export const SettingsModal = ()=>{
    const settings = UserSetting();
    return(
        <>
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
 
  <DialogContent>
    <DialogHeader className="border-b pb-3">
     <h2 className="text-lg font-medium">
        My Settings
     </h2>
    </DialogHeader>
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
            <Label>
                Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
                Customize how jotion Looks on your device
            </span>
        </div>
        <ModeToggle/>
    </div>
  </DialogContent>
</Dialog>
</>
    )
}