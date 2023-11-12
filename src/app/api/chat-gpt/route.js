import { NextResponse } from "next/server";
import formidable from 'formidable';
import pdfParse from 'pdf-parse';
import OpenAI from "openai";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    const form = new formidable.IncomingForm();
    
    try {
        const { files } = await new Promise((resolve, reject) => {
            form.parse(request, (err, fields, files) => {
                console.log('bruh');
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const filePath = files.file.filepath;
        const dataBuffer = await fs.promises.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const pdfText = pdfData.text;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are reviewing a resume"
                },
                {
                    role:"user",
                    content: pdfText
                }
            ],
            temperature: 0,
            max_tokens: 1024,
            top_p:1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return NextResponse.json(response);

    } catch (error) {
        console.error("Error processing the PDF file:", error);
        return NextResponse.json({ error: "Error processing the PDF file" });
    }
}
