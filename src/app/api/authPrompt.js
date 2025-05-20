import { NextResponse } from "next/server"





export async function POOST(req) {

    try {
        
        const body = await req.json();

        const {prompt , modelSelected , userId} = body

        if(!prompt || !modelSelected ||!userId) {
            return NextResponse.json({
                success : false,
                message : "prompt or model or userId may not avalible"
            })
        }


        

    } catch (error) {
        console.log("error",error)
        return NextResponse.json ({
            success : false ,
            message :"Internal server error"
        })
    }
    
}