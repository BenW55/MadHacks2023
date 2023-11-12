const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const pdfParse = require('pdf-parse');
const { OpenAI } = require("openai");
const fs = require('fs').promises;
require('dotenv').config({ path: '../../../.env' });
const multer = require('multer');
const upload = multer();

const app = express();

app.use(express.json());

app.use(cors());

app.post('/chat-gpt', upload.single('files'), async (req, res) => {
    
    const form = new formidable.IncomingForm();
    try {
        // Assuming `buffer` is your PDF buffer from the request
let buffer = req.file.buffer;
let data = await pdfParse(buffer);
let text = data.text;
// Extract text from the PDF buffer

        
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "you are a hiring manager looking at a prospective candidate for a tech company and provide feedback"
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.json(response);

    } catch (error) {
        console.error("Error processing the PDF file:", error);
        res.status(500).json({ error: "Error processing the PDF file" });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
