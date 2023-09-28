'use client';

import { useState } from "react";
import Title from "../title";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { set } from "zod";
import axios from "axios";
import { Sheet } from "@prisma/client";

export default function MySheetPage({sheets:s}: {sheets: Sheet[]}) {
    const [sheets, setSheets] = useState(s)

    const deleteSheet = async (sheetId:String) => {
        setSheets(sheets.filter((sheet:Sheet) => sheet.id !== sheetId))
        try {
            await axios.delete(`/api/sheet/${sheetId}`)
        } catch (error) {
            console.log("[ERROR DELETE SHEET] : ", error)
        }
    }
    
    const copySharingLink = (sheet:Sheet ) =>{
        navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/sheet/${sheet.id}`
            )
            toast.success("Lien copié dans le presse-papier !")
    }

    return (
    <div className="w-full flex flex-col p-4 mt-14 md:mt-0">
        <Toaster/>
        <Title text="Vos fiches de révisions" />
        <span className="text-md md:text-lg text-black dark:text-zinc-500 italic">
            Ici vous pouvez retrouver toutes vos fiches de révisions. Vous pouvez les consulter, les partager avec vos amis ou les supprimer.
        </span>
        <Separator className="my-4"/>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sheets.map((sheet:Sheet) => (
                <div key={sheet.id} className="p-4 m-3 bg-primary/10 hover:bg-primary/20 transition duration-200 ease-in-out items-center justify-center rounded">
                <Link href={`sheet/${sheet.id}`}>
                    <div className="flex w-full justify-between mb-3">
                        <span className="text-xl">Title</span>
                        <span>21/12/33</span>
                    </div>
                    <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, sunt...</span>
                </Link>
                <div className="flex w-full justify-between mt-4">
                        <Button variant={"premium"}>Consulter</Button>
                        <div className="flex">
                            <Button variant={"ghost"}><AiOutlineShareAlt size={25} onClick={() => copySharingLink(sheet)
                            }/></Button>
                            <Button variant={"ghost"}><MdDeleteForever size={25} onClick={() => deleteSheet(sheet.id)} color="red"/></Button>           
                        </div>
                                    
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}