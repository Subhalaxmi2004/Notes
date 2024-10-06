"use client"
import {useState,useEffect} from "react"
import {SettingsModal} from "../modal/SettingsModal"
export const ModalProvider = () =>{
    const [isMounted,setisMounted]=useState(false)
    useEffect(()=>{
        setisMounted(true)
    },[])
    if(!isMounted){
        return null;
    }
    return(
        <>
        <SettingsModal/>

        </>
    )
}