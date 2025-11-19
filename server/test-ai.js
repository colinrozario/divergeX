import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load .env from server root
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Checking environment...');
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing from process.env');
    process.exit(1);
} else {
    console.log('✅ GEMINI_API_KEY is present');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGenAI() {
    console.log('Testing Google GenAI connection...');
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];

    for (const model of models) {
        console.log(`\nTrying model: ${model}...`);
        try {
            const response = await ai.models.generateContent({
                model: model,
                contents: 'Hello, are you working?'
            });

            console.log(`✅ API Call Successful with ${model}!`);
            console.log('Response:', response.text);
            return; // Exit on success
        } catch (error) {
            console.error(`❌ Failed with ${model}: ${error.message || error.statusText || error}`);
        }
    }
}

testGenAI();
