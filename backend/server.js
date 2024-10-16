// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Endpoint to handle the AI request
app.post('/api/check-code', async (req, res) => {
    const prompt = `Check this and give some comments: ${req.body.code}`;

    try {
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error generating AI content:', error);
        res.status(500).json({ error: 'An error occurred while generating content.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
