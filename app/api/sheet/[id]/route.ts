import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest ,{params} : {params : {id : string}}) {
    const id = params.id
    
    if(!id) {throw new Error("No id provided")}

    const res = await prismadb.sheet.delete({where : {id : id.toString() }});

    if(!res) {throw new Error("No sheet found")}

    return NextResponse.json("Sheet deleted");
}
