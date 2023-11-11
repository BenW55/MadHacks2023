import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request)
{

    console.log(process.env.OPENAI_API_KEY);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    return NextResponse.json({name: "WORKS",

})
}